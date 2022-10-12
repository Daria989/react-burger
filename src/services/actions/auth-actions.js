import { registerRequest, loginRequest, 
  refreshTokenRequest, logoutRequest, getUserRequest, updateUserRequest, 
  forgotPasswordRequest, resetRequest, checkResponse } from '../../api';

import { setCookie, deleteCookie } from '../cookie';

export const GET_REGISTER_REQUEST = 'GET_REGISTER_REQUEST';
export const GET_REGISTER_SUCCESS = 'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILED = 'GET_REGISTER_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const GET_UPDATE_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_UPDATE_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_UPDATE_USER_FAILED = 'GET_USER_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const GET_LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const GET_LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const GET_LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED = 'GET_LOGIN_FAILED';

export const UPDATE_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export function getRegisterData(userName, email, password) {
  return function(dispatch) {
    dispatch({
			type: GET_REGISTER_REQUEST,
		});
    registerRequest(userName, email, password)
    .then (res  => {
      if (res && res.success) {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        localStorage.setItem('refreshToken', refreshToken);
        setCookie('token', accessToken);
        dispatch({
          type: GET_REGISTER_SUCCESS,
          user: res.user,
          data: res.success
        });
      } else {
          dispatch({
            type: GET_REGISTER_FAILED,
          });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_REGISTER_FAILED,
      });
    });
  }
}

export function getLoginData(form) {
  return function(dispatch) {
    dispatch({
			type: GET_LOGIN_REQUEST,
		});
    loginRequest(form)
    .then (res  => {
      if (res && res.success) {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        localStorage.setItem('refreshToken', refreshToken);
        setCookie('token', accessToken);
        dispatch({
          type: GET_LOGIN_SUCCESS,
          user: res.user,
          data: res.success
        });
      } else {
          dispatch({
            type: GET_LOGIN_FAILED,
          });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_LOGIN_FAILED,
      });
    });
  }
}

export function updateToken(refreshToken) {
	return function (dispatch) {
    dispatch({
			type: UPDATE_TOKEN_REQUEST,
		});
		refreshTokenRequest(refreshToken)
    .then((res) => {
			if (res && res.success) {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        localStorage.setItem('refreshToken', refreshToken);
				setCookie('token', accessToken);
				dispatch({
					type: UPDATE_TOKEN_SUCCESS,
				});
			} else {
          dispatch({
            type: UPDATE_TOKEN_FAILED,
          });
			}
		})
    .catch((err) => {
			deleteCookie('token');
			localStorage.removeItem('refreshToken');
			dispatch({
				type: UPDATE_TOKEN_FAILED,
			});
		});
	};
};

export function getLogoutData(refreshToken) {
  return function(dispatch) {
    dispatch({
			type: GET_LOGOUT_REQUEST,
		});
    logoutRequest(refreshToken)
    .then (res  => {
      if (res && res.success) {
        localStorage.removeItem('refreshToken');
        deleteCookie('token');
        dispatch({
          type: GET_LOGOUT_SUCCESS,
          data: res.success,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_LOGOUT_FAILED,
      });
    });
  }
}

export function getUserData() {
  return function(dispatch) {
    dispatch({
			type: GET_USER_REQUEST,
		});
    getUserRequest()
    .then (res  => {
      if (res && res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
          data: res.success
        })
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_FAILED,
      });
    });
  }
}

export function getUpdateUserData(form) {
  return function(dispatch) {
    dispatch({
			type: GET_UPDATE_USER_REQUEST,
		});
    updateUserRequest(form)
    .then (res  => {
      if (res && res.success) {
        dispatch({
          type: GET_UPDATE_USER_SUCCESS,
          data: res.user
        })
      } else {
          throw res;
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_UPDATE_USER_FAILED,
      });
    });
  }
}

export function getForgotPasswordData(email) {
  return function(dispatch) {
    dispatch({
			type: FORGOT_PASSWORD_REQUEST,
		});
    forgotPasswordRequest(email)
    .then (res  => {
      if (res && res.success) {
        dispatch({
					type: FORGOT_PASSWORD_SUCCESS,
          data: res.success
				});
      }
    })
    .catch((err) => {
      dispatch({
        type: FORGOT_PASSWORD_FAILED,
      });
    });
  }
}

export function getResetPasswordData(form) {
  return function(dispatch) {
    dispatch({
			type: RESET_PASSWORD_REQUEST,
		});
    resetRequest(form)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          data: res.success
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });

      }
    })
    .catch((err) => {
      dispatch({
        type: RESET_PASSWORD_FAILED,
      });
    });
  }
}