import card from './card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Card(props) {

  return (
      <div className={`m-3 ${card.item}`}>
        <div className={card.image}><img src={props.image} alt="картинка"/></div>
        <div className={`mt-1 mb-1 ${card.price}`}>
          <p className={'mr-2 text text_type_digits-default'}>{props.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <div className={`${card.name} text text_type_main-default`}>{props.name}</div>
      </div>
  );
};

export default Card;