class Api {
  constructor(baseUrl) {
      this._baseUrl = baseUrl;
    }

    _сheckServerResponse(res) {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        credentials: 'include',
      })
      .then(this._сheckServerResponse);
    }

    setUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, about })
      })
      .then(this._сheckServerResponse);
    }

    setUserAvatar(url) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(url)
      })
      .then(this._сheckServerResponse);
    }

    getCards() {
      return fetch(`${this._baseUrl}/cards`, {
        credentials: 'include',
      })
      .then(this._сheckServerResponse);
    }

    setCard({ link, name }) {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ link: link, name: name })
      })
      .then(this._сheckServerResponse);
    }

    deleteCard(_id) {
      return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      .then(this._сheckServerResponse);
    }

    changeLikeCardStatus(_id, isLiked) {
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
        method: isLiked ? 'PUT' : 'DELETE',
        credentials: 'include',
      })
      .then(this._сheckServerResponse);
    }
}

export default new Api('https://api.app-mesto.nomorepartiesxyz.ru');