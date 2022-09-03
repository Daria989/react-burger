import card from './card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import { useState } from 'react';
import IngredientDetails from "../ingredient-details/ingredient-details";
import { DescriptionType } from '../../utils/types'
import { useDispatch} from 'react-redux';
import { getIngredientDetails } from '../../services/actions/actions';
import { useDrag } from "react-dnd";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

function Card({description}) {
  const data = useSelector(store => store.addConstructorList.data);
  const {name, price, image, id, ...details} = description;
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();

  const [{opacity}, ref] = useDrag({
    type: "ingredient",
    item: description,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
});

  function getDetails() {
    setModalActive(true);
    dispatch(getIngredientDetails(description));
  }

   const counter = data.filter(element => element.type !== "bun").filter(element => element.name === name).length


  return (
    <>
      <div onClick={getDetails} ref = {ref} style={{ opacity }} className={`m-3 ${card.item}`}>
        <div className={card.image}>
          <img src={image} alt={card.name}/>
          {counter > 0? <Counter count={counter} size="small" /> : null}
        </div>
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