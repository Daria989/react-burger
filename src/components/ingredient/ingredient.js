import Card from '../card/card';
import ingredient from './ingredient.module.css';
import PropTypes from 'prop-types';

function cardItem(arr) {
  return arr.data.filter(obj => obj.type === arr.id).map(obj =>
    <Card key={obj._id} data = {obj}/>
    )
}

function Ingredient(props) {

  return (
    <>
      <h2 id = {props.id} className={"pt-10 text text_type_main-medium"}>{props.type}</h2>
      <section className={`pl-1 pr-1 pb-7 pt-3 ${ingredient.tab}`}>
          {cardItem(props)}
      </section>
    </>
  );
};

Ingredient.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string
}; 

export default Ingredient;
