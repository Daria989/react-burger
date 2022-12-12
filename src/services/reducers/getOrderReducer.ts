import {GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../actions/getOrderAction';
import { burgerOrderInitialState } from '../initialData';
import { TBurgerOrderInitialState } from '../../utils/types';
import { TIngredientsDataActions } from '../actions/ingredientsAction';

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