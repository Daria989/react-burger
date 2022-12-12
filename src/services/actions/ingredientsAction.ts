import { apiGetIngredients } from '../../utils/api';
import { AppDispatch} from '../../utils/types';
import { TIngredientType } from '../../utils/types';
import { IPostDataSuccessAction, IPostDataFailedAction, IClearOrder} from './sendOrderAction';
import { IGetConstructorListAction, IAddConstructorElementAction, IDeleteConstructorElementAction } from './constructorActions';
import { IGetOrderSuccess, IGetOrderFailed } from './getOrderAction';

export const GET_DATA_SUCCESS: 'GET_DATA_SUCCESS' = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILED: 'GET_DATA_FAILED' = 'GET_DATA_FAILED';

export const ADD_INGREDIENT_DETAILS: 'ADD_INGREDIENT_DETAILS' = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS: 'DELETE_INGREDIENT_DETAILS' = 'DELETE_INGREDIENT_DETAILS';

export interface IGetDataSuccessAction {
  readonly type: typeof GET_DATA_SUCCESS,
  data: Array<TIngredientType>
}

export interface IGetDataFailedAction {
  readonly type: typeof GET_DATA_FAILED
}

export interface IAddIngredientDetailsAction {
  readonly type: typeof ADD_INGREDIENT_DETAILS,
  data: TIngredientType
}

export interface IDeleteIngredientDetailsAction {
  readonly type: typeof DELETE_INGREDIENT_DETAILS,
  data: number
}

export type TIngredientsDataActions = IGetConstructorListAction
                    | IAddConstructorElementAction
                    | IDeleteConstructorElementAction
                    | IGetDataSuccessAction
                    | IGetDataFailedAction
                    | IPostDataSuccessAction
                    | IPostDataFailedAction
                    | IAddIngredientDetailsAction
                    | IDeleteIngredientDetailsAction
                    | IGetOrderSuccess
                    | IGetOrderFailed
                    | IClearOrder

export function getData() {
  return function(dispatch: AppDispatch) {
    apiGetIngredients()
    .then(res  => {
      if (res && res.success) {
        dispatch({
          type: GET_DATA_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: GET_DATA_FAILED
        })
      }
    })
    .catch(err => {
      dispatch({
        type: GET_DATA_FAILED
      })
    })
  }
}

export function getIngredientDetails(data: TIngredientType) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      data
    }) 
  }
}

export function deleteIngredientDetails(data: number) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: DELETE_INGREDIENT_DETAILS,
      data: data
    }) 
  }
}