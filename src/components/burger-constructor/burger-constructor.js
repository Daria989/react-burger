import burgerConstructor from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import { useState } from 'react';
import OrderDetails from "../order-details/order-details";
import { useContext } from 'react';
import { DataContext } from '../../services/dataContext.js';
import { apiPostOrder } from '../../api';

function BurgerConstructor() {
  const [modalActive, setModalActive] = useState(false);
  const data = useContext(DataContext);
  const [res, setRes] = useState(0);

  function constructorElement(arr) {
    return findNotBun(arr).map(obj =>
      <div key={obj._id} className={`mb-4 mr-2 ${burgerConstructor.element}`}>
        <DragIcon />
        <ConstructorElement
          text={obj.name}
          price={obj.price}
          thumbnail={obj.image}
        />
      </div>
    )
  }

  function findNotBun(arr) {
    return arr.filter(obj => obj.type !== 'bun');
  }

  function findBun(arr) {
    return arr.find((element) => element.type === 'bun');;
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

    apiPostOrder(obj)
      .then(result => setRes(result.order.number))
      .catch((error) => setRes(error));
  }

  return (
   <div className={`mt-25 pl-4 ${burgerConstructor.container}`}>
      <div className={burgerConstructor.burger}>
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
            {constructorElement(data)}
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
              <OrderDetails res = {res}/>
          </Modal>
        }
      </div>
    </div>
  )
}

export default BurgerConstructor;
