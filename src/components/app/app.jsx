import { apiGetIngredients } from '../../api';
import app from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { useState, useEffect } from 'react';
import { DataContext } from '../../services/dataContext.js';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiGetIngredients()
      .then(result => setData(result))
      .catch((error) => setData(error));
  }, [])

  return (
    <>
    { data.length > 0 &&
      <div className={app.app}>
        <AppHeader />
          <main className={`mt-20 ${app.main}`}>
            <DataContext.Provider value={data}>
              <BurgerIngredients/>
              <BurgerConstructor />
            </DataContext.Provider>
          </main>
      </div>
    }
  </>
  );
}

export default App;
