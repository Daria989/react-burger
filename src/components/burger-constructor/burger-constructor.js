import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../constructor-item/constructor-item';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import { useState, useEffect, useCallback} from 'react';
import OrderDetails from "../order-details/order-details";
import { useSelector } from 'react-redux';
import { getOrderDetails, getConstructorData, addConstructorElement, deleteConstructorElement } from '../../services/actions/actions';
import { useDrop} from 'react-dnd';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';


function BurgerConstructor() {
  const [modalActive, setModalActive] = useState(false);
  const data = useSelector(store => store.addConstructorList.data);
  const ingredientData = useSelector(store => store.addIngredientsList.data);
  const res = useSelector(store => store.addOrderDetails.data.order.number);
  const dispatch = useDispatch();

  const handleClose = (id) => {
    dispatch(deleteConstructorElement(id))
  };

  const [, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch(addConstructorElement({...item, dragId: uuid()}))
    }
  });

  const arrOffIngredients = getArrOfIngredients(ingredientData);
  const newArr = arrOffIngredients.map(obj => ({...obj, dragId: uuid()}))
  
  useEffect(() => {
    dispatch(getConstructorData(newArr)) 
  }, []);

  function findNotBun(arr) {
    return arr.filter(obj => obj.type !== 'bun');
  }

  function findBun(arr) {
    return arr.find((element) => element.type === 'bun');
  }

  function getArrOfIngredients(arr) {
    return findNotBun(arr).concat(findBun(arr)).concat(findBun(arr));
  }

  function findIngredientsIds(arr) {
    return getArrOfIngredients(arr).map(obj => obj._id);
  }

  function priceSum(arr) {
    return getArrOfIngredients(arr).map(obj => obj.price).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  }

  function placeOrder() {
    setModalActive(true);
    const obj = {
      "ingredients": findIngredientsIds(data)
    };
    dispatch(getOrderDetails(obj));
   }

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = data[dragIndex];
    const newCards = [...data];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    dispatch(getConstructorData(newCards))
  }, [data, dispatch]);

  return (
    <>
      { data.length > 0 &&
      <div className={`mt-25 pl-4 ${burgerConstructor.container}`}>
          <div ref={dropTargetRef} className={burgerConstructor.burger}>
              <div className={`mb-4 mr-2 pl-7 ${burgerConstructor.element}`}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${findBun(data).name} (верх)`}
                  price={findBun(data).price}
                  thumbnail={findBun(data).image}
                />
              </div>
              <div className={burgerConstructor.box}>
                {findNotBun(data).map((item, index) =>
                  <ConstructorItem item={item} index={index} key={item.dragId} moveCard={moveCard} handleClose={() => handleClose(item._id)}/>
                  )}
              </div>
              <div className={`mt-2 pl-7 ${burgerConstructor.element}`}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${findBun(data).name} (низ)`}
                  price={findBun(data).price}
                  thumbnail={findBun(data).image}
                />
              </div>
          </div>
          <div className={`mt-10 ${burgerConstructor.button}`}>
            <div className={`text text_type_digits-medium ${burgerConstructor.summ}`}>
              {priceSum(data)}
            </div>
            <CurrencyIcon type="primary" />
            <Button type="primary" size="medium" onClick={placeOrder}>
              Оформить заказ
            </Button>
            {modalActive &&
            <Modal setActive={setModalActive} header = {''}>
                  <OrderDetails res={res}/>
              </Modal>
            }
          </div>
        </div>
        }
    </>
  )
}

export default BurgerConstructor;
