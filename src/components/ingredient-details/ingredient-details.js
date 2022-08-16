import ingredientDetails from './ingredient-details.module.css';
import {DetailsTypes} from '../../utils/types';

function IngredientDetails({details}) {
    let {name, calories, proteins, fat, carbohydrates, image_large} = details;

    return (
        <>
            <div className={ingredientDetails.modalImage}>
                <img src={image_large} alt="картинка"/>
            </div>
            <div className={"text text_type_main-medium mt-4"}>{name}</div>
            <div className={`mb-15 mt-8 className="text text_type_main-small ${ingredientDetails.composition}`}>
                <div className={ingredientDetails.compositionItem}>
                    <p>Калории, ккал</p>
                    {calories}
                </div>
                <div className={ingredientDetails.compositionItem}>
                    <p>Белки, г</p>
                    {proteins}
                </div>
                <div className={ingredientDetails.compositionItem}>
                    <p>Жиры, г</p>
                    {fat}
                </div>
                <div className={ingredientDetails.compositionItem}>
                    <p>Углеводы, г</p>
                    {carbohydrates}
                </div>
            </div>
        </>
    );      
}

IngredientDetails.propTypes = {
    details: DetailsTypes
}; 

export default IngredientDetails;
