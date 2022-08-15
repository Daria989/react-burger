import burgerConstructor from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import {useState} from 'react';
import PropTypes from 'prop-types';
import OrderDetails from "../order-details/order-details";

function priceSumm(arr) {
  return arr.map(obj => obj.price).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
}

function constructorElement(arr) {
  return arr.slice(1).map(obj =>
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

function BurgerConstructor(props) {
  let data = props.props;
  const [modalActive, setModalActive] = useState(false);

  return (
   <div className={`mt-25 pl-4 ${burgerConstructor.container}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <div className={`mb-1 mr-2 pl-7 ${burgerConstructor.element}`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${data[0].name} (верх)`}
              price={200}
              thumbnail={data[0].image}
            />
          </div>
          <div className={burgerConstructor.box}>
            {constructorElement(data)}
          </div>
          <div className={`pl-7 ${burgerConstructor.element}`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${data[0].name} (низ)`}
              price={200}
              thumbnail={data[0].image}
            />
          </div>
      </div>
      <div className={`mt-10 ${burgerConstructor.button}`}>
        <div className={`text text_type_digits-medium ${burgerConstructor.summ}`}>
          {priceSumm(data)}
        </div>
        <CurrencyIcon type="primary" />
        <Button type="primary" size="medium" onClick={() => {console.log(modalActive); setModalActive(true)}}>
          Оформить заказ
        </Button>
        {modalActive &&
         <Modal setActive={setModalActive} header = {''}>
            <OrderDetails/>
          </Modal>
        }
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  image: PropTypes.string, 
  name: PropTypes.string
}; 

export default BurgerConstructor;