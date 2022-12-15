import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { wsReducer } from './wsReducers';
import { wsReducerAuth } from './wsReducersAuth';

import { addIngredientsList, addIngredientDetails} from './ingredientsReducer';
import { addBurgerOrder } from '../reducers/getOrderReducer';

import { addConstructorList } from './constructorReducer';

import { addOrderDetails} from './sendOrderReducer';

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
