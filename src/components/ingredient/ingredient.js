import Card from '../card/card';
import ingredient from './ingredient.module.css';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { DataContext } from '../../services/dataContext.js';

function cardItem(id, arr) {
  return arr.filter(obj => obj.type === id)
            .map(obj => <Card key={obj._id} description={obj}/>)
}

function Ingredient({id, type}) {
  const data = useContext(DataContext);

  return (
    <>
      <h2 id={id} className={"pt-10 text text_type_main-medium"}>{type}</h2>
      <section className={`pl-1 pr-1 pb-7 pt-3 ${ingredient.tab}`}>
          {cardItem(id, data)}
      </section>
    </>
  );
};

Ingredient.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}; 

export default Ingredient;
