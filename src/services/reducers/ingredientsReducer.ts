import { ingredientInitialState, ingredientDetailsInitialState } from '../initialData';
import { TIngredientInitialState, TIngredientDetailsInitialState } from '../../utils/types';
import { TIngredientsDataActions } from '../actions/ingredientsAction';

import {
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,

    ADD_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS
} from '../actions/ingredientsAction';

  export const addIngredientsList = (state = ingredientInitialState, action: TIngredientsDataActions): TIngredientInitialState => {
    switch (action.type) {
      case GET_DATA_SUCCESS: {
        return { 
          ...state, 
          data: action.data, 
        };
      }
      case GET_DATA_FAILED: {
        return { 
          ...state, 
          feedFailed: true, 
        };
      }
        default: {
          return state
        }
      }
  }

  export const addIngredientDetails = (state = ingredientDetailsInitialState, action: TIngredientsDataActions): TIngredientDetailsInitialState => {
    switch (action.type) { 
      case ADD_INGREDIENT_DETAILS: {
        return {
          data: action.data
        };
      }
      case DELETE_INGREDIENT_DETAILS: {
        return {
          data: action.data
        }
      }
        default: {
          return state
        }
    }
  }
