import burgerConstructor from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import {useState} from 'react';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import done from '../../images/done.png';

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
        <Button type="primary" size="medium" onClick={() => setModalActive(true)}>
          Оформить заказ
        </Button>
        <Modal active={modalActive} setActive={setModalActive}>
          <div className={`mt-10  mr-10 ${burgerConstructor.closeIcon}`}>
            <CloseIcon type="primary" onClick={() =>setModalActive(false)}/>
          </div>   
          <div className={`mr-25 ml-25 mt-4 mb-8 text text_type_digits-large`}>034536</div>
          <div className={`mb-15 text text_type_main-medium`}>идентификатор заказа</div>
          <div className={`mb-15 ${burgerConstructor.image}`}>
            <img src={done} alt="done"></img>
          </div>
          <div className={`mb-2 text text_type_main-small`}>Ваш заказ начали готовить</div>
          <div className={`mb-30 text text_type_main-small ${burgerConstructor.text}`}>Дождитесь готовности на орбитальной станции</div>
        </Modal>
      </div>
    </div>
  )
}

export default BurgerConstructor;