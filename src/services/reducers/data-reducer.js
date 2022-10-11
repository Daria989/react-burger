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

} from '../actions/data-actions';

import { 
    orderInitialState,
    ingredientInitialState,
    ingredientDetailsInitialState,
    constructorInitialState,
} from '../initialData';

  export const addIngredientsList = (state = ingredientInitialState, action) => {
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

  export const addIngredientDetails = (state = ingredientDetailsInitialState, action) => {
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

  export const addOrderDetails = (state = orderInitialState, action) => {
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

  export const addConstructorList = (state = constructorInitialState, action) => { 
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