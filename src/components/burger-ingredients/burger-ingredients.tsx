import burgerIngredients from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef, useEffect} from 'react';
import Ingredient from '../ingredient/ingredient';

function BurgerIngredients() {
  const [current, setCurrent] = useState<string>('bun');
  const rootRef = useRef<HTMLInputElement>(null);
  const bunRef = useRef<HTMLInputElement>(null);
  const sauceRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLInputElement>(null);

function handleScroll() {
  if (rootRef && bunRef && sauceRef && mainRef && rootRef.current && bunRef.current && sauceRef.current && mainRef.current) {
			const bunDistance = Math.abs(rootRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
			const sauceDistance = Math.abs(rootRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
      const mainDistance = Math.abs(rootRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
      const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
			const currentHeader = minDistance === bunDistance ? 'bun' : minDistance === sauceDistance ? 'sauce' : 'main';
			setCurrent(prevState => (currentHeader === prevState ? prevState : currentHeader))

		}
}

useEffect(() => {
  document.querySelector(`#${current}`)?.scrollIntoView();
},[current])

  return (
    <div className={burgerIngredients.container}>
      <h1 className={`text text_type_main-large ${burgerIngredients.header}`}>Соберите бургер</h1>
      <div className={burgerIngredients.tabs}>
        <a className={burgerIngredients.link} href="#bun"><Tab value = 'bun' active={current === 'bun'} onClick={setCurrent}>
          Булки     
        </Tab></a>
        <a className={burgerIngredients.link} href="#sauce"><Tab value = 'sauce' active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab></a>
        <a className={burgerIngredients.link} href="#main"><Tab value = 'main' active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab></a>
      </div>
      <section onScroll={handleScroll} ref={rootRef} className={burgerIngredients.content}>
        <Ingredient id="bun" innerRef={bunRef} type="Булки"/>
        <Ingredient id="sauce" innerRef={sauceRef} type="Соусы"/>
        <Ingredient id="main" innerRef={mainRef} type="Начинки"/>
      </section>
    </div>
  );
}

export default BurgerIngredients;
