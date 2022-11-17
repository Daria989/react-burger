import {getCookie, setCookie} from './services/cookie';
import {TForm} from './utils/types';

const baseUrl = "https://norma.nomoreparties.space/api";

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

export async function apiGetIngredients() {
  return fetch(`${baseUrl}/ingredients`)
    .then(checkResponse)
}

export async function apiPostOrder(order: number) {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  })
    .then(checkResponse)
}

const saveTokens = (refreshToken: string, accessToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export async function forgotPasswordRequest(email: string) {
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

export async function resetRequest(form: TForm) {
  return await fetch(`${baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  .then(checkResponse)
};

export async function registerRequest(userName: string, email: string, password: string) {
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

export async function loginRequest(form: TForm) {
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

export async function logoutRequest(refreshToken: string) {
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

export const updateUserRequest = (form: TForm) => {
  return fetch(`${baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify(form),
  })
  .then(checkResponse)
};

export const fetchWithRefresh = async(url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);

    return await checkResponse(res);
  } catch (err: unknown) {
    const customError = err as {
      code: string; 
      message: string;
    }
    if (customError.message === 'jwt expired') {
      const {refreshToken, accessToken} = await refreshTokenRequest();
      saveTokens(refreshToken, accessToken);

      (options.headers as { [key: string]: string }) = accessToken;

      const res = await fetch(url, options);

      return await checkResponse(res);
    } else {
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