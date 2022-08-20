import app from'./app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {useState, useEffect} from 'react';
import { DataContext } from '../../services/dataContext.js';

const BURGER_API_URL = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

async function fetchIngredients() {
  return fetch(`${BURGER_API_URL}/ingredients`)
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchIngredients()
      .then(result => setData(result),
            error => setData(error))
  }, [])

  return (
    <>
    { data.length > 0 &&
      <div className={app.app}>
        <AppHeader />
          <main className={`mt-20 ${app.main}`}>
            <DataContext.Provider value={data}>
              <BurgerIngredients ingredients={data}/>
              <BurgerConstructor />
            </DataContext.Provider>
          </main>
      </div>
    }
  </>
  );
}

export default App;
