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

  changeLikePostStatus(postID:string, like:boolean) {
    // Обычная реализация: 2 разных метода для удаления и постановки лайка.
    return axios({
      method: `${like ? "PUT" : "DELETE"}`,
      url: `${this._baseUrl}/posts/likes/${postID}`,
      headers: {
        authorization: this._token,
      },
    });   
  }

  deletePost(postID: string) {
    return axios.delete(`${this._baseUrl}/posts/${postID}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    })
  }

  setUserInfo({ name, about }: {name: string, about: string}) {
    return axios.patch(`${this._baseUrl}/usersx/me`, 
    { name, about },
    {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      
    })
  }

  setUserAvatar(avatar: string) {
    return axios.patch(`${this._baseUrl}/usersx/me/avatar`, 
    {avatar},
    {
      headers: {
        authorization: this._token,
      },
    })
  }

  getPostById(postId: string) {
    return axios.get(`${this._baseUrl}/posts/${postId}`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
        }
    })
  }

  getUser(id: string) {
		return axios.get(`${this._baseUrl}/users/${id}`, {
			headers: {
				authorization: this._token,
			},
		})
	}

  getComments(id: string) {
		return axios.get(`${this._baseUrl}/posts/comments/${id}`, {
			headers: {
				authorization: this._token,
			},
		});
	}

  postComment(id: string, text: string) {
		return axios.post(`${this._baseUrl}/posts/comments/${id}`, 
    {text},
    {
			headers: {
				authorization: this._token,
        "Content-Type": "application/json",
			},
		});
	}

  postPost(data: PostPostProps) {
		return axios.post(`${this._baseUrl}/posts`,
    data,
    {
      method: "POST",
			headers: {
				authorization: this._token,
        "Content-Type": "application/json",
			},
		})
	}

  updatePost(id: string, data: PostPostProps) {
		return axios.patch(`${this._baseUrl}/posts/${id}`, 
    data,
    {
			headers: {
				authorization: this._token,
        "Content-Type": "application/json",
			},
		});
	}

  deleteComment(postID: string, commentID: string) {
    return axios.delete(`${this._baseUrl}/posts/comments/${postID}/${commentID}`, {
      headers: {
        authorization: this._token,
      },
    });
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