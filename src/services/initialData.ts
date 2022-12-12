import { TOrderInitialState, TIngredientInitialState, TIngredientDetailsInitialState, TConstructorInitialState, TAuthInitialState, TBurgerOrderInitialState } from '../utils/types';

export const orderInitialState: TOrderInitialState = {
    feedFailed: false,
    data: {
        order: 0
      }
};

export const ingredientInitialState: TIngredientInitialState = {
    feedFailed: false,
    data: []
}

export const ingredientDetailsInitialState: TIngredientDetailsInitialState = {
    data: null
}

export const constructorInitialState: TConstructorInitialState = {
    data: []
}

export const burgerOrderInitialState: TBurgerOrderInitialState = {
    data: null
}

export const authInitialState: TAuthInitialState = {
    name: '',
    email: '',
    password: '',

    registerRequest: false,
    registerFailed: false,
    registerSuccess: false,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordSuccess: false,

    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    forgotPasswordSuccess: false,

    loginRequest: false,
    loginFailed: false,
    loginSuccess: false,

    getUserRequest: false,
    getUserFailed: false,
    getUserSuccess: false,

    logoutRequest: false,
    logoutFailed: false,
    logoutSuccess: false,

    updateUserRequest: false,
    updateUserFailed: false,

    isTokenUpdated: false,
    // tokenUpdateDate: false,
}
