class Api {
  constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _сheckResponse(res) {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._сheckResponse)
    }

    setUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({ name, about })
      })
      .then(this._сheckResponse);
    }

    setUserAvatar(url) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify(url)
      })
      .then(this._сheckResponse);
    }

    getCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._сheckResponse);
    }

    setCard({ link, name }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({ link: link, name: name })
      })
      .then(this._сheckResponse)
    }

    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._сheckResponse);
    }

    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._сheckResponse);
    }
  }

  const api = new Api({
    baseUrl: 'http://localhost:4000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export default api;
