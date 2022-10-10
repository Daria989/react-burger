import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import home from './home.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getData } from '../services/actions/actions';

function Home() {
    const dispatch = useDispatch();
    const data = useSelector(store => store.addIngredientsList.data);
    
    useEffect(() => {
      dispatch(getData());
    }, [dispatch])

return (
    <>
        { data.length > 0 &&
            <div className={home.app}>
                <main className={`mt-20 ${home.main}`}>
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

export default Home;