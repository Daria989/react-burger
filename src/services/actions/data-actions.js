import { apiGetIngredients, apiPostOrder } from '../../api';

export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';

export const POST_DATA_SUCCESS = 'POST_DATA_SUCCESS';
export const POST_DATA_FAILED = 'POST_DATA_FAILED';

export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';

export const GET_CONSTRUCTOR_LIST = 'GET_CONSTRUCTOR_LIST';
export const ADD_CONSTRUCTOR_ELEMENT = 'ADD_CONSTRUCTOR_ELEMENT';
export const DELETE_CONSTRUCTOR_ELEMENT = 'DELETE_CONSTRUCTOR_ELEMENT';

export function getConstructorData(data) {
  return function(dispatch) {
    dispatch({
      type: GET_CONSTRUCTOR_LIST,
      data: data
    }) 
  }
}

export function addConstructorElement(item) {
  return function(dispatch) {
    dispatch({
      type: ADD_CONSTRUCTOR_ELEMENT,
      data: item
    }) 
  }
 }

export function deleteConstructorElement(id) {
  return function(dispatch) {
    dispatch({
      type: DELETE_CONSTRUCTOR_ELEMENT,
      data: id
    }) 
  }
}

export function getData() {
  return function(dispatch) {
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

export function getOrderDetails(obj) {
  return function (dispatch) {
    apiPostOrder(obj)
    .then(res  => {
      if (res && res.success) {
        dispatch({
          type: POST_DATA_SUCCESS,
          data: {
            order: res.order
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

export function getIngredientDetails(data) {
  return function(dispatch) {
    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      data
    }) 
  }
}

export function deleteIngredientDetails(data) {
  return function(dispatch) {
    dispatch({
      type: DELETE_INGREDIENT_DETAILS,
      data: data
    }) 
  }
}