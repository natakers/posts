const onResponce = (res) => {
  console.log(res);
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ baseUrl, token }) {
    this._token = `Bearer ${token}`;
    this._baseUrl = baseUrl;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  getPostList() {
    return fetch(`${this._baseUrl}/posts`, {
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  changeLikePostStatus(postID, like) {
    // Обычная реализация: 2 разных метода для удаления и постановки лайка.
    return fetch(`${this._baseUrl}/posts/likes/${postID}`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(onResponce);
  }

  deletePost(postID) {
    return fetch(`${this._baseUrl}/posts/${postID}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(onResponce);
  }

  getPostById(postId) {
    return fetch(`${this._baseUrl}/posts/${postId}`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
        }
    }).then(onResponce)
  }

  getUser(id) {
		return fetch(`${this._baseUrl}/users/${id}`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}

  getComments(id) {
		return fetch(`${this._baseUrl}/posts/comments/${id}`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}

  postComment(id, text) {
		return fetch(`${this._baseUrl}/posts/comments/${id}`, {
      method: "POST",
			headers: {
				authorization: this._token,
        "Content-Type": "application/json",
			},
      body: JSON.stringify({
        text
      }),
		}).then(onResponce);
	}
}



const config = {
    baseUrl:'https://api.react-learning.ru/v2/group-10',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UxMmRmNDU5Yjk4YjAzOGY3N2IyMjgiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1NzAxNzgwLCJleHAiOjE3MDcyMzc3ODB9.zyudBlyMJGJX7MyT2kglcsfV5h-RFGpaT7KCgoV76Sw'
}

const api = new Api(config)

export default api;