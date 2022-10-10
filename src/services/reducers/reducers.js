import {
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,

    POST_DATA_SUCCESS,
    POST_DATA_FAILED,

    ADD_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS,

    GET_CONSTRUCTOR_LIST,
    ADD_CONSTRUCTOR_ELEMENT,
    DELETE_CONSTRUCTOR_ELEMENT,

    GET_REGISTER_REQUEST,
    GET_REGISTER_SUCCESS,
    GET_REGISTER_FAILED,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,

    GET_LOGIN_REQUEST,
    GET_LOGIN_SUCCESS,
    GET_LOGIN_FAILED,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,

    GET_LOGOUT_REQUEST,
    GET_LOGOUT_SUCCESS,
    GET_LOGOUT_FAILED,

    GET_UPDATE_USER_REQUEST,
    GET_UPDATE_USER_SUCCESS,
    GET_UPDATE_USER_FAILED,

    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_FAILED
    
} from '../actions/actions';

import { 
    orderInitialState,
    ingredientInitialState,
    ingredientDetailsInitialState,
    constructorInitialState,

    authInitialState
} from '../initialData';

  export const addIngredientsList = (state = ingredientInitialState, action) => {
    switch (action.type) {
      case GET_DATA_SUCCESS: {
        return { 
          ...state, 
          data: action.data, 
        };
      }
      case GET_DATA_FAILED: {
        return { 
          ...state, 
          feedFailed: true, 
        };
      }
        default: {
            return state
        }
      }
  }

  export const addIngredientDetails = (state = ingredientDetailsInitialState, action) => {
    switch (action.type) { 
      case ADD_INGREDIENT_DETAILS: {
        return {
          data: action.data
        };
      }
      case DELETE_INGREDIENT_DETAILS: {
        return {
          data: action.data
        }
      }
        default: {
          return state
        }
    }
  }

  export const addOrderDetails = (state = orderInitialState, action) => {
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
        default: {
          return state
        }
      }
  }

  export const addConstructorList = (state = constructorInitialState, action) => { 
    switch (action.type) {
      case GET_CONSTRUCTOR_LIST: {
        return { 
          ...state, 
          data: action.data, 
        };
      }
      case ADD_CONSTRUCTOR_ELEMENT: {
        if (action.data.type === 'bun') {
          return {
            data: [
            ...state.data.filter(element => element.type !== "bun"), action.data, action.data
          ]}
        } else 
          return {
            data: [
              action.data, ...state.data
            ]}
      }
      case DELETE_CONSTRUCTOR_ELEMENT: {
       const arr = state.data.filter(element => element.dragId !== action.data);
        return { 
          data: arr
        }
      }
        default: {
          return state
        }
      }
  }

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) { 

// регистрация 

    case GET_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
        registerSuccess: false
      };
    }
    case GET_REGISTER_SUCCESS: {
      return {
        ...state,
        registerFailed: false,
        name: action.user.name,
        email: action.user.email,
        registerRequest: false,
        registerSuccess: action.data
      };
    }
    case GET_REGISTER_FAILED: {
      return {
        ...state, 
        registerFailed: true, 
        registerRequest: false,
        registerSuccess: false 
      };
    }

// смена пароля

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
        forgotPasswordSuccess: false
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
        forgotPasswordSuccess: action.data
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: false
      };
    }

// сброс пароля

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
        resetPasswordSuccess: false
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordSuccess: action.data,

      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
        resetPasswordSuccess: false
      };
    }

// вход
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
        loginSuccess: false
      };
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        loginFailed: false,
        name: action.user.name,
        email: action.user.email,
        loginRequest: false,
        loginSuccess: true,
        logoutSuccess: false
      };
    }
    case GET_LOGIN_FAILED: {
      return { 
        ...state, 
        loginFailed: true, 
        loginRequest: false,
        loginSuccess: false 
      };
    }

// выход
    case GET_LOGOUT_REQUEST: {
      return {
        // ...state,
        // logoutRequest: false,
        // logoutFailed: false,
        // logoutSuccess: false
      };
    }
    case GET_LOGOUT_SUCCESS: {
      return {
        // ...state,
        // logoutRequest: false,
        // logoutFailed: false,
        // logoutSuccess: action.data, 
        // name: '',
        // email: '',
      };
    }
    case GET_LOGOUT_FAILED: {
      return { 
        // ...state, 
        // logoutFailed: true, 
        // logoutRequest: false,
        // logoutSuccess: false 
      };
    }

// данные пользователя

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
        getUserSuccess: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserFailed: false,
        name: action.user.name,
        email: action.user.email,
        getUserRequest: false,
        getUserSuccess: true,
        isTokenUpdated: true,
      };
    }
    case GET_USER_FAILED: {
      return { 
        ...state, 
        getUserFailed: true, 
        getUserRequest: false,
        getUserSuccess: false,
        isTokenUpdated: false, 
      };
    }

// обновление данных пользователя

    case GET_UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false,
      };
    }
    case GET_UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserFailed: false,
        name: action.user.name,
        email: action.user.email,
        updateUserRequest: false,
      };
    }
    case GET_UPDATE_USER_FAILED: {
      return { 
        ...state, 
        updateUserFailed: true, 
        updateUserRequest: false };
    }

// обновление токена

    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
      };
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        isTokenUpdated: true,
        // tokenUpdateDate: true,
      };
    }
    case UPDATE_TOKEN_FAILED: {
      return { 
        ...state, 
        isTokenUpdated: false, 
        // tokenUpdateDate: false 
      };
    }
    default: {
      return state;
    }
  }
}

