import { combineReducers } from 'redux';
import { addIngredientsList, addOrderDetails, addIngredientDetails, 
  addConstructorList, authReducer } from './reducers';

export const rootReducer = combineReducers({
    addIngredientsList: addIngredientsList,
    addOrderDetails: addOrderDetails,
    addIngredientDetails: addIngredientDetails,
    addConstructorList: addConstructorList,
    authReducer: authReducer,
  });
