import {
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,

    POST_DATA_SUCCESS,
    POST_DATA_FAILED,

    ADD_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS,

    GET_CONSTRUCTOR_LIST,
    ADD_CONSTRUCTOR_ELEMENT,
    DELETE_CONSTRUCTOR_ELEMENT,

    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,

} from '../actions/data-actions';

import { 
    orderInitialState,
    ingredientInitialState,
    ingredientDetailsInitialState,
    constructorInitialState,
    burgerOrderInitialState
} from '../initialData';

import { TIngredientInitialState, 
  TOrderInitialState, 
  TIngredientDetailsInitialState, 
  TConstructorInitialState,
  TBurgerOrderInitialState
} from '../../utils/types';

import { TIngredientsDataActions } from '../actions/data-actions';

  export const addBurgerOrder = (state = burgerOrderInitialState, action: TIngredientsDataActions): TBurgerOrderInitialState => {
    switch (action.type) {
      case GET_ORDER_SUCCESS: {
        return {
          ...state,
          data: action.data
        };
      }
      case GET_ORDER_FAILED: {
        return {
          ...state
        }
      }
      default: {
        return state
      }
    }
  }

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

  export const addOrderDetails = (state = orderInitialState, action: TIngredientsDataActions): TOrderInitialState => {
    switch (action.type) {
      case POST_DATA_SUCCESS: {
        return { 
          ...state, 
          data: action.data, 
        };
      }
      case POST_DATA_FAILED: {
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

  export const addConstructorList = (state = constructorInitialState, action: TIngredientsDataActions): TConstructorInitialState => { 
    switch (action.type) {
      case GET_CONSTRUCTOR_LIST: {
        return { 
          ...state, 
          data: action.data, 
        };
      }
      case ADD_CONSTRUCTOR_ELEMENT: {
        if (action.data.type === 'bun') {
          return {
            data: [
            ...state.data.filter(element => element.type !== "bun"), action.data, action.data
          ]}
        } else 
          return {
            data: [
              action.data, ...state.data
            ]}
      }
      case DELETE_CONSTRUCTOR_ELEMENT: {
       const arr = state.data.filter(element => element.dragId !== action.data);
        return { 
          data: arr
        }
      }
        default: {
          return state
        }
      }
  }