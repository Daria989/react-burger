import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import home from './home.module.css';
import { useSelector } from 'react-redux';

function Home() {
    const data = useSelector(store => store.addIngredientsList.data);
    
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