import React from 'react';
import burgerIngredients from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import Card from '../card/card';
import Ingredient from '../ingredient/ingredient'

function BurgerIngredients(props) {
  const [current, setCurrent] = useState('one');
  let data = props.props;

  return (
    <div className={burgerIngredients.container}>
      <h1 className={`text text_type_main-large ${burgerIngredients.header}`}>Соберите бургер</h1>
      <div className={burgerIngredients.tabs}>
        <a className={burgerIngredients.link} href="#bun"><Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки     
        </Tab></a>
        <a className={burgerIngredients.link} href="#sauce"><Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab></a>
        <a className={burgerIngredients.link} href="#main"><Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab></a>
      </div>
      <section className={burgerIngredients.content}>
        <Ingredient id = "bun" type = "Булки" data = {data}/>
        <Ingredient id = "sauce" type = "Соусы" data = {data}/>
        <Ingredient id = "main" type = "Начинки" data = {data}/>
      </section>
    </div>
  );
}

export default BurgerIngredients;