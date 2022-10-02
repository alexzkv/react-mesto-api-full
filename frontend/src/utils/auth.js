// const baseUrl = 'https://api.app-mesto.nomorepartiesxyz.ru';
const baseUrl = 'http://localhost:3000';

const headers = {
  'Content-Type': 'application/json',
}

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  })
  .then(res => checkResponse(res));
}
export const authorize = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  .then(res => checkResponse(res))
}

export const getContent = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers,
    credentials: 'include',
  })
  .then(res => checkResponse(res));
}

export const logout = () => {
  return fetch(`${baseUrl}/logout`, {
    method: 'GET',
    headers,
    credentials: 'include',
  })
  .then(res => checkResponse(res));
}
