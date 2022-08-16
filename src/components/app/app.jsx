import app from'./app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {useState, useEffect} from 'react'

const BURGER_API_URL = "https://norma.nomoreparties.space/api"

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

async function fetchMyAPI() {
  return fetch(`${BURGER_API_URL}/ingredients`)
    .then(checkReponse)
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMyAPI()
      .then(result => setData(result),
            error => console.log(error))
  }, [])

  return (
    <>
    { data.length > 0 &&
      <div className={app.app}>
        <AppHeader />
          <main className={`mt-20 ${app.main}`}>
            <BurgerIngredients ingredients={data}/>
            <BurgerConstructor ingredients={data}/>
          </main>
      </div>
    }
  </>
  );
}

export default App;
