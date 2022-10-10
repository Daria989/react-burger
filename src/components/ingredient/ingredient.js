import Card from '../card/card';
import ingredient from './ingredient.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";

function cardItem(id, arr) {
  return arr.filter(obj => obj.type === id)
            .map(obj => <Card key={obj._id} description={obj}/>)
}
function Ingredient({id, innerRef, type}) {
  const data = useSelector(store => store.addIngredientsList.data);

  return (
    <>
      <h2 id={id} ref={innerRef} className={"pt-10 text text_type_main-medium"}>{type}</h2>
      <section className={`pl-1 pr-1 pb-7 pt-3 ${ingredient.tab}`}>
          {cardItem(id, data)}
      </section>
    </>
  );
};

Ingredient.propTypes = {
  id: PropTypes.string.isRequired,
  innerRef: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default Ingredient;
