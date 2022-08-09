import Card from '../card/card';
import ingredient from './ingredient.module.css';

function Ingredient(props) {

  return (
    <>
      <h2 id = {props.id} className={"pt-10 text text_type_main-medium"}>{props.type}</h2>
      <section className={`pl-1 pr-1 pb-7 pt-3 ${ingredient.tab}`}>
          {props.data.filter(obj => obj.type == props.id).map(obj =>
            <Card key={obj._id} price={obj.price} name={obj.name} image={obj.image}/>
            )
          }
      </section>
    </>
  );
};

export default Ingredient;