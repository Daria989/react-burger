import { POST_DATA_SUCCESS, POST_DATA_FAILED, CLEAR_ORDER } from '../actions/sendOrderAction';
import { orderInitialState } from '../initialData';
import { TOrderInitialState } from '../../utils/types';
import { TIngredientsDataActions } from '../actions/ingredientsAction';

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
      case CLEAR_ORDER: {
        return {
          ...state, 
          feedFailed: false,
          data: {
              order: 0
            }
        }
      }
        default: {
          return state
        }
      }
  }