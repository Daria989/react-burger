import React from 'react';
import app from'./app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import data from '../../utils/data';

function App() {
  return (
    <div className={app.app}>
      <AppHeader />
      <main className={`mt-20 ${app.main}`}>
        <BurgerIngredients props = {data}/>
        <BurgerConstructor props = {data}/>
      </main>
    </div>
  );
}

export default App;
