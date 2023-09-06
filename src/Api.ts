import { PostPostProps } from "components/Modal/ModalPost";
import { UserSignIn } from "components/Modal/ModalSignIn";
import { UserSignUp } from "components/Modal/ModalSignUp";
import axios from "axios";

const onResponce = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  _token: string;
  _baseUrl: string;

  constructor({ baseUrl }:{baseUrl: string}) {
    this._token = '';
    this._baseUrl = baseUrl;
  }

  singUpUser(data: UserSignUp) {
    return axios.post(`https://api.react-learning.ru/signup`, 
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
      
    })
  }

  singInUser(data: UserSignIn) {
    return axios.post(`https://api.react-learning.ru/signin`, 
    data,
    { 
      headers: {
        "Content-Type": "application/json",
      },
    })
    
  }

  getUserInfo() {
    return axios.get(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
  }

  getPostList() {
    return axios.get(`${this._baseUrl}/posts`, {
      headers: {
        authorization: this._token,
      },
    })
  }

  changeLikePostStatus(postID: string, like: boolean) {
    // Обычная реализация: 2 разных метода для удаления и постановки лайка.
    return fetch(`${this._baseUrl}/posts/likes/${postID}`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(onResponce);
  }

  deletePost(postID: string) {
    return fetch(`${this._baseUrl}/posts/${postID}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  setUserInfo({ name, about }: {name: string, about: string}) {
    return axios.patch(`${this._baseUrl}/users/me`, 
    { name, about },
    {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      
    })
  }

  setUserAvatar(avatar: string) {
    return axios.patch(`${this._baseUrl}/users/me/avatar`, 
    {avatar},
    {
      headers: {
        authorization: this._token,
      },
    })
  }

  getPostById(postId: string) {
    console.log('gdgdg');
    return fetch(`${this._baseUrl}/posts/${postId}`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
        }
    }).then(onResponce)
  }

  getUser(id: string) {
		return axios.get(`${this._baseUrl}/users/${id}`, {
			headers: {
				authorization: this._token,
			},
		})
	}

  getComments(id: string) {
		return fetch(`${this._baseUrl}/posts/comments/${id}`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}

  postComment(id: string, text: string) {
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

  postPost(data: PostPostProps) {
		return fetch(`${this._baseUrl}/posts`, {
      method: "POST",
			headers: {
				authorization: this._token,
        "Content-Type": "application/json",
			},
      body: JSON.stringify(data),
		}).then(onResponce);
	}

  updatePost(id: string, data: PostPostProps) {
		return fetch(`${this._baseUrl}/posts/${id}`, {
      method: "PATCH",
			headers: {
				authorization: this._token,
        "Content-Type": "application/json",
			},
      body: JSON.stringify(data),
		}).then(onResponce);
	}

  deleteComment(postID: string, commentID: string) {
    return fetch(`${this._baseUrl}/posts/comments/${postID}/${commentID}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  getPostPagin(page: number, number: number) {
    return fetch(`${this._baseUrl}/posts/paginate?page=${page}&limit=${number}`, {
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }
}



const config: {baseUrl: string } = {
    baseUrl:'https://api.react-learning.ru/v2/group-10',
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UxMmRmNDU5Yjk4YjAzOGY3N2IyMjgiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1NzAxNzgwLCJleHAiOjE3MDcyMzc3ODB9.zyudBlyMJGJX7MyT2kglcsfV5h-RFGpaT7KCgoV76Sw'
}

const api = new Api(config)

export default api;