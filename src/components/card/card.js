import card from './card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import {useState} from 'react';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function Card(props) {
  props = props.data;
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      <div onClick={() => setModalActive(true)} className={`m-3 ${card.item}`}>
        <div className={card.image}><img src={props.image} alt="картинка"/></div>
        <div className={`mt-1 mb-1 ${card.price}`}>
          <p className={'mr-2 text text_type_digits-default'}>{props.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <div className={`${card.name} text text_type_main-default`}>{props.name}</div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className={`ml-10 mt-10 mr-10 text text_type_main-large ${card.details}`}>
          <p>Детали ингредиента</p>
          <CloseIcon type="primary" onClick={() =>setModalActive(false)}/>
        </div>
        <div className={card.modalImage}>
          <img src={props.image_large} alt="картинка"/>
        </div>
        <div className={"text text_type_main-medium mt-4"}>{props.name}</div>
        <div className={`mb-15 mt-8 className="text text_type_main-small ${card.composition}`}>
          <div className={card.compositionItem}>
            <p>Калории, ккал</p>
            {props.calories}
          </div>
          <div className={card.compositionItem}>
            <p>Белки, г</p>
            {props.proteins}
          </div>
          <div className={card.compositionItem}>
            <p>Жиры, г</p>
            {props.fat}
          </div>
          <div className={card.compositionItem}>
            <p>Углеводы, г</p>
            {props.carbohydrates}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Card;