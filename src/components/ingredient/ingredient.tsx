import Card from '../card/card';
import ingredient from './ingredient.module.css';
import { useSelector } from 'react-redux';
import {TIngredientTypeWithIndex, TIngredientTypeIngredient} from '../../utils/types';

function cardItem(id: string, arr: TIngredientTypeWithIndex[]) {
  return arr.filter((obj: TIngredientTypeWithIndex) => obj.type === id)
            .map((obj: TIngredientTypeWithIndex) => <Card key={obj._id} description={obj}/>)
}
function Ingredient({id, innerRef, type}: TIngredientTypeIngredient) {
  const data: any = useSelector<any>(store => store.addIngredientsList.data);

  return (
    <>
      <h2 id={id} ref={innerRef} className={"pt-10 text text_type_main-medium"}>{type}</h2>
      <section className={`pl-1 pr-1 pb-7 pt-3 ${ingredient.tab}`}>
          {cardItem(id, data)}
      </section>
    </>
  );
};

export default Ingredient;
