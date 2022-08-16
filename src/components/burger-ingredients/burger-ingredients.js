import burgerIngredients from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';
import Ingredient from '../ingredient/ingredient';
import {IngredientsType} from '../../utils/types'

function BurgerIngredients({ingredients}) {
  const [current, setCurrent] = useState(0);

  return (
    <div className={burgerIngredients.container}>
      <h1 className={`text text_type_main-large ${burgerIngredients.header}`}>Соберите бургер</h1>
      <div className={burgerIngredients.tabs}>
        <a className={burgerIngredients.link} href="#bun"><Tab active={current === 0} onClick={setCurrent}>
          Булки     
        </Tab></a>
        <a className={burgerIngredients.link} href="#sauce"><Tab active={current === 1} onClick={setCurrent}>
          Соусы
        </Tab></a>
        <a className={burgerIngredients.link} href="#main"><Tab active={current === 2} onClick={setCurrent}>
          Начинки
        </Tab></a>
      </div>
      <section className={burgerIngredients.content}>
        <Ingredient id="bun" type="Булки" list={ingredients}/>
        <Ingredient id="sauce" type="Соусы" list={ingredients}/>
        <Ingredient id="main" type="Начинки" list={ingredients}/>
      </section>
    </div>
  );
}

BurgerIngredients.propTypes = {
  ingredients: IngredientsType
}

export default BurgerIngredients;
