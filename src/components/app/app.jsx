import React from 'react';
import app from'./app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {useState, useEffect} from 'react'
import PropTypes from 'prop-types';

function App() {
  const link = 'https://norma.nomoreparties.space/api/ingredients';
  const [data, setData] = useState({success: false, data: []});
 
    useEffect(() => {
      let response = { txt: "hello" };
      async function fetchMyAPI() {
        response = await fetch(link)
        response = await response.json()
        setData(response)
      }

      fetchMyAPI();
    },[data])

  return (
    <>
    { data.success === true && 
      <div className={app.app}>
        <AppHeader />
          <main className={`mt-20 ${app.main}`}>
            <BurgerIngredients props={data.data}/>
            <BurgerConstructor props={data.data}/>
          </main>
      </div>
    }
  </>
  );
}

// App.propTypes = {
//   data: PropTypes.object
// }; 

export default App;
