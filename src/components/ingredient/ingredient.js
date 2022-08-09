import Card from '../card/card';
import ingredient from './ingredient.module.css';

function cardItem (arr) {
  return arr.data.filter(obj => obj.type == arr.id).map(obj =>
    <Card key={obj._id} price={obj.price} name={obj.name} image={obj.image}/>
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

export default Ingredient;