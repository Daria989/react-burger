import PropTypes from 'prop-types';

export const IngredientType = PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
})

export const IngredientsType = PropTypes.arrayOf(IngredientType)

export const DescriptionType = IngredientType

export const DetailsTypes = PropTypes.shape({
    image_large: PropTypes.string, 
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number    
})

export const SetActive = PropTypes.func.isRequired
