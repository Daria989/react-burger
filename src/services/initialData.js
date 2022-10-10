export const orderInitialState = {
    feedFailed: false,
    data: {
        name: '',
        order: {
            number: 0
        },
        success: false
    },
};

export const ingredientInitialState = {
    feedFailed: false,
    data: []
}

export const ingredientDetailsInitialState = {
    data: {}
}

export const constructorInitialState = {
    data: []
}

export const authInitialState = {
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
