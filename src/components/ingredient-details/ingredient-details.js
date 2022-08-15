import ingredientDetails from './ingredient-details.module.css';
import PropTypes from 'prop-types';

function IngredientDetails(props) {
    props = props.props;
    
    return (
        <>
            <div className={ingredientDetails.modalImage}>
                <img src={props.image_large} alt="картинка"/>
            </div>
            <div className={"text text_type_main-medium mt-4"}>{props.name}</div>
            <div className={`mb-15 mt-8 className="text text_type_main-small ${ingredientDetails.composition}`}>
                <div className={ingredientDetails.compositionItem}>
                    <p>Калории, ккал</p>
                    {props.calories}
                </div>
                <div className={ingredientDetails.compositionItem}>
                    <p>Белки, г</p>
                    {props.proteins}
                </div>
                <div className={ingredientDetails.compositionItem}>
                    <p>Жиры, г</p>
                    {props.fat}
                </div>
                <div className={ingredientDetails.compositionItem}>
                    <p>Углеводы, г</p>
                    {props.carbohydrates}
                </div>
            </div>
        </>
    );      
}

IngredientDetails.propTypes = {
    name: PropTypes.string,
    image_large: PropTypes.string, 
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
  }; 

export default IngredientDetails;