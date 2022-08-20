import burgerConstructor from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import {useState} from 'react';
import OrderDetails from "../order-details/order-details";
import { useContext } from 'react';
import { DataContext } from '../../services/dataContext.js';
import { OrderContext } from '../../services/orderContext.js';

function BurgerConstructor() {
  const [modalActive, setModalActive] = useState(false);
  const data = useContext(DataContext);
  const [res, setRes] = useState();

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
    let newArr = arr.filter(obj => obj.type !== 'bun');
    return newArr;
  }

  function findBun(arr) {
    let newArr = arr.find((element) => element.type === 'bun');
    return newArr;
  }

  function getArrOfIngredients(arr) {
    let newArr = findNotBun(arr).concat(findBun(arr)).concat(findBun(arr));
    return newArr;
  }

  function findIngredientsIds(arr) {
    return getArrOfIngredients(arr).map(obj => obj._id);
  }

  function priceSum(arr) {
    let sum = getArrOfIngredients(arr);
    console.log(sum);
    return getArrOfIngredients(arr).map(obj => obj.price).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  }

  function placeOrder() {
    setModalActive(true);
    let obj = {
      "ingredients": findIngredientsIds(data)
    };

    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(result => setRes(result.order.number))
  }
  
  return (
   <div className={`mt-25 pl-4 ${burgerConstructor.container}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <div className={`mb-1 mr-2 pl-7 ${burgerConstructor.element}`}>
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
          <div className={`pl-7 ${burgerConstructor.element}`}>
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
            <OrderContext.Provider value={res}>
              <OrderDetails />
            </OrderContext.Provider>
          </Modal>
        }
      </div>
    </div>
  )
}

export default BurgerConstructor;
