import { apiGetIngredients, apiPostOrder, getOrderByNumber } from '../../api';
import { AppDispatch} from '../../utils/types';
import { TIngredientTypeWithDragId,  TIngredientType, TIngredientsIds} from '../../utils/types';

export const GET_DATA_SUCCESS: 'GET_DATA_SUCCESS' = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILED: 'GET_DATA_FAILED' = 'GET_DATA_FAILED';

export const POST_DATA_SUCCESS: 'POST_DATA_SUCCESS' = 'POST_DATA_SUCCESS';
export const POST_DATA_FAILED: 'POST_DATA_FAILED' = 'POST_DATA_FAILED';

export const ADD_INGREDIENT_DETAILS: 'ADD_INGREDIENT_DETAILS' = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS: 'DELETE_INGREDIENT_DETAILS' = 'DELETE_INGREDIENT_DETAILS';

export const GET_CONSTRUCTOR_LIST: 'GET_CONSTRUCTOR_LIST' = 'GET_CONSTRUCTOR_LIST';
export const ADD_CONSTRUCTOR_ELEMENT: 'ADD_CONSTRUCTOR_ELEMENT' = 'ADD_CONSTRUCTOR_ELEMENT';
export const DELETE_CONSTRUCTOR_ELEMENT: 'DELETE_CONSTRUCTOR_ELEMENT' = 'DELETE_CONSTRUCTOR_ELEMENT';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export interface IGetConstructorListAction {
  readonly type: typeof GET_CONSTRUCTOR_LIST,
  data: Array<TIngredientType>
}

export interface IAddConstructorElementAction {
  readonly type: typeof ADD_CONSTRUCTOR_ELEMENT,
  data: TIngredientTypeWithDragId
}

export interface IDeleteConstructorElementAction {
  readonly type: typeof DELETE_CONSTRUCTOR_ELEMENT,
  data: number
}

export interface IGetDataSuccessAction {
  readonly type: typeof GET_DATA_SUCCESS,
  data: Array<TIngredientType>
}

export interface IGetDataFailedAction {
  readonly type: typeof GET_DATA_FAILED
}

export interface IPostDataSuccessAction {
  readonly type: typeof POST_DATA_SUCCESS,
  data: {
    order: number
  }
}

export interface IPostDataFailedAction {
  readonly type: typeof POST_DATA_FAILED
}

export interface IAddIngredientDetailsAction {
  readonly type: typeof ADD_INGREDIENT_DETAILS,
  data: TIngredientType
}

export interface IDeleteIngredientDetailsAction {
  readonly type: typeof DELETE_INGREDIENT_DETAILS,
  data: number
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS,
  data: any
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED
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

export function getOrderRequest(number: number) {
  return function(dispatch: AppDispatch) {
    getOrderByNumber(number)
    .then(res  => {
      if (res && res.success) {
        console.log(res)
        dispatch({
          type: GET_ORDER_SUCCESS,
          data: res.orders[0]
        })
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        })
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ORDER_FAILED
      })
    })
  }
}

export function getConstructorData(data: Array<TIngredientType>) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_CONSTRUCTOR_LIST,
      data: data
    }) 
  }
}

export function addConstructorElement(item: TIngredientTypeWithDragId) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: ADD_CONSTRUCTOR_ELEMENT,
      data: item
    }) 
  }
 }

export function deleteConstructorElement(id: number) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: DELETE_CONSTRUCTOR_ELEMENT,
      data: id
    }) 
  }
}

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