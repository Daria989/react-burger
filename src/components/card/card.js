import card from './card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import {useState} from 'react';
import PropTypes from 'prop-types';
import IngredientDetails from "../ingredient-details/ingredient-details";

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
      {modalActive &&
        <Modal setActive={setModalActive} header='Детали ингредиента'>
          <div className={`ml-10 mt-10 mr-10 text text_type_main-large ${card.details}`}/>
          <IngredientDetails props={props}/>
        </Modal>
      }
    </>
  );
};

Card.propTypes = {
  image: PropTypes.string, 
  price: PropTypes.number,
  name: PropTypes.string,
  image_large: PropTypes.string, 
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number
}; 

export default Card;