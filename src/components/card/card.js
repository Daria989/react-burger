import card from './card.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import {useState} from 'react';
import IngredientDetails from "../ingredient-details/ingredient-details";
import {DescriptionType} from '../../utils/types'

function Card({description}) {
  let {name, price, image, ...details} = description;
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <div onClick={() => setModalActive(true)} className={`m-3 ${card.item}`}>
        <div className={card.image}><img src={image} alt={card.name}/></div>
        <div className={`mt-1 mb-1 ${card.price}`}>
          <p className={'mr-2 text text_type_digits-default'}>{price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <div className={`${card.name} text text_type_main-default`}>{name}</div>
      </div>
      {modalActive &&
        <Modal setActive={setModalActive} header='Детали ингредиента'>
          <div className={`ml-10 mt-10 mr-10 text text_type_main-large ${details}`}/>
          <IngredientDetails name={name} details={details}/>
        </Modal>
      }
    </>
  );
};

Card.propTypes = {
  description: DescriptionType.isRequired
}; 

export default Card;