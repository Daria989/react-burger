import { combineReducers } from 'redux';
import { authReducer } from './auth-reducer';
import { wsReducer } from './wsReducers';
import { wsReducerAuth } from './wsReducersAuth';

import { addIngredientsList, addOrderDetails, addIngredientDetails, 
  addConstructorList, addBurgerOrder} from './data-reducer';

export const rootReducer = combineReducers({
    addIngredientsList: addIngredientsList,
    addOrderDetails: addOrderDetails,
    addIngredientDetails: addIngredientDetails,
    addConstructorList: addConstructorList,
    authReducer: authReducer,
    wsReducer: wsReducer,
    addBurgerOrder: addBurgerOrder,
    wsReducerAuth: wsReducerAuth,
  });
