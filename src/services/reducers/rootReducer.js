import { combineReducers } from 'redux';
import { addIngredientsList, addOrderDetails, addIngredientDetails, addConstructorList } from './reducers';

export const rootReducer = combineReducers({
    addIngredientsList: addIngredientsList,
    addOrderDetails: addOrderDetails,
    addIngredientDetails: addIngredientDetails,
    addConstructorList: addConstructorList
  });