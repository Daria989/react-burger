import app from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getData } from '../../services/actions/actions';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const data = useSelector(store => store.addIngredientsList.data);
  
  useEffect(() => {
    dispatch(getData());
  }, [dispatch])

  return (
    <>
    { data.length > 0 &&
      <div className={app.app}>
        <AppHeader />
        <main className={`mt-20 ${app.main}`}>
          <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
          </DndProvider>
        </main>
      </div>
    }
    </>
  );
}

export default App;
