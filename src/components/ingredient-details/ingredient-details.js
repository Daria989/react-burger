import ingredientDetails from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

 function IngredientDetails() {
    const { id } = useParams();
    const data = useSelector(store => store.addIngredientsList.data);
    const currentIngredient = data.length? data.find(el => el._id === id) : null;
    console.log(data)

    if (!currentIngredient) {
        return null
    }

    return (
        <div className={ingredientDetails.container}>
            <main className={ingredientDetails.main}>
                <h1 className="mb-10 text text_type_main-large">Детали ингредиента</h1>
                <div className={ingredientDetails.modalImage}>
                    <img src={currentIngredient.image_large} alt={currentIngredient.name}/>
                </div>
                <div className={"text text_type_main-medium mt-4"}>{currentIngredient.name}</div>
                <div className={`mb-15 mt-8 className="text text_type_main-small ${ingredientDetails.composition}`}>
                    <div className={ingredientDetails.compositionItem}>
                        <p>Калории, ккал</p>
                        {currentIngredient.calories}
                    </div>
                    <div className={ingredientDetails.compositionItem}>
                        <p>Белки, г</p>
                        {currentIngredient.proteins}
                    </div>
                    <div className={ingredientDetails.compositionItem}>
                        <p>Жиры, г</p>
                        {currentIngredient.fat}
                    </div>
                    <div className={ingredientDetails.compositionItem}>
                        <p>Углеводы, г</p>
                        {currentIngredient.carbohydrates}
                    </div>
                </div>
            </main>
        </div>
    );      
}

export default IngredientDetails;
