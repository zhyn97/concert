import { BASE_URL } from "./constant";

class Api {
    constructor({ url }) {
        this.url = url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка : ${res.status}`);
        }
    }

    login(userData) {
        return fetch(`${this.url}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then(this._checkResponse)
    }

    upDate(token, data) {
        return fetch(`${this.url}/api/cards/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(this._checkResponse)
    }

    delete(id, token) {
        return fetch(`${this.url}/api/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(this._checkResponse)
    }

    addCard(token, newItem) {
        return fetch(`${this.url}/api/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newItem)
        })
            .then(this._checkResponse)
    }


}

const api = new Api({
    url: BASE_URL,
});

export default api;