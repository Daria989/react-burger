import { combineReducers } from 'redux';
import { authReducer } from './auth-reducer';

import { addIngredientsList, addOrderDetails, addIngredientDetails, 
  addConstructorList} from './data-reducer';

export const rootReducer = combineReducers({
    addIngredientsList: addIngredientsList,
    addOrderDetails: addOrderDetails,
    addIngredientDetails: addIngredientDetails,
    addConstructorList: addConstructorList,
    authReducer: authReducer,
  });
