import { apiPostOrder } from '../../utils/api';
import { AppDispatch} from '../../utils/types';
import { TIngredientsIds} from '../../utils/types';

export const POST_DATA_SUCCESS: 'POST_DATA_SUCCESS' = 'POST_DATA_SUCCESS';
export const POST_DATA_FAILED: 'POST_DATA_FAILED' = 'POST_DATA_FAILED';
export const CLEAR_ORDER: 'CLEAR_ORDER' = 'CLEAR_ORDER';


export interface IPostDataSuccessAction {
    readonly type: typeof POST_DATA_SUCCESS,
    data: {
      order: number
    }
  }

export interface IPostDataFailedAction {
readonly type: typeof POST_DATA_FAILED
}

export interface IClearOrder {
readonly type: typeof CLEAR_ORDER
}

export function getOrderDetails(obj: TIngredientsIds) {
    return function (dispatch: AppDispatch) {
      apiPostOrder(obj)
      .then(res  => {
        if (res && res.success) {
          dispatch({
            type: POST_DATA_SUCCESS,
            data: {
              order: res.order.number
            }
          })
        } else {
          dispatch({
            type: POST_DATA_FAILED
          })
        }
      })
      .catch(err => {
        dispatch({
          type: POST_DATA_FAILED
        })
      })
    }
  }

export function clearOrder() {
    return function (dispatch: AppDispatch) {
        dispatch({type: CLEAR_ORDER});
}
}