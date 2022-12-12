import { getCookie, setCookie } from '../services/cookie';
import { TForm } from './types';
import { BASE_URL } from './constants'


export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

export const getOrderByNumber = (number: number) => {
  return fetch(`${BASE_URL}/orders/${number}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export async function apiGetIngredients() {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
}

export async function apiPostOrder(order: object) {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
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
  return await fetch(`${BASE_URL}/password-reset`, {
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
  return await fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  .then(checkResponse)
};

export async function registerRequest(userName: string, email: string, password: string) {
  return await fetch(`${BASE_URL}/auth/register`, {
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
  return await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  .then(checkResponse)
};

export async function refreshTokenRequest() {
  return await fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "token": localStorage.getItem('refreshToken')
    })
  })
  .then(checkResponse)
};

export async function logoutRequest(refreshToken: string | null) {
  return await fetch(`${BASE_URL}/auth/logout`, {
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
  return fetch(`${BASE_URL}/auth/user`, {
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
    if (customError.message === 'jwt expired' || customError.message === 'jwt malformed') {
      console.log(customError.message)
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
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
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