import {getCookie, setCookie, deleteCookie } from './services/cookie';

const baseUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

export async function apiGetIngredients() {
  return fetch(`${baseUrl}/ingredients`)
    .then(checkResponse)
}

export async function apiPostOrder(order) {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  })
    .then(checkResponse)
}

const saveTokens = (refreshToken, accessToken) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export async function forgotPasswordRequest(email) {
  return await fetch(`${baseUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email
    })
  })
  .then(checkResponse)
};

export async function resetRequest(form) {
  return await fetch(`${baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  .then(checkResponse)
};

export async function registerRequest(userName, email, password) {
  return await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email, 
      "password": password,
      "name": userName 
    })
  })
  .then(checkResponse)
};

export async function loginRequest(form) {
  return await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  .then(checkResponse)
};

export async function refreshTokenRequest() {
  return await fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
  .then(checkResponse)
};

export async function logoutRequest(refreshToken) {
  return await fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "token": refreshToken
    })
  })
  .then(checkResponse)
};

export const updateUserRequest = (form) => {
  return fetch(`${baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify(form),
  })
};

export const fetchWithRefresh = async(url, options) => {
  try {
    const res = await fetch(url, options);

    return await checkResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const {refreshToken, accessToken} = await refreshTokenRequest();
      saveTokens(refreshToken, accessToken);

      options.headers.authorization = accessToken;

      const res = await fetch(url, options);

      return await checkResponse(res);
    } else {
        // deleteCookie('token');
        // localStorage.removeItem('refreshToken');
        return Promise.reject(err);
    }
  }
}

export async function getUserRequest() {
  return fetchWithRefresh(`${baseUrl}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
};