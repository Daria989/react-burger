import Card from '../card/card';
import ingredient from './ingredient.module.css';
import PropTypes from 'prop-types';
import {IngredientsType} from '../../utils/types'

function cardItem(id, arr) {
  return arr.filter(obj => obj.type === id)
            .map(obj => <Card key={obj._id} description={obj}/>)
}

function Ingredient({id, type, list}) {
  return (
    <>
      <h2 id={id} className={"pt-10 text text_type_main-medium"}>{type}</h2>
      <section className={`pl-1 pr-1 pb-7 pt-3 ${ingredient.tab}`}>
          {cardItem(id, list)}
      </section>
    </>
  );
};

Ingredient.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  list: IngredientsType
}; 

export default Ingredient;
