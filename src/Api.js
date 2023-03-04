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
	
}


const config = {
    baseUrl:'https://api.react-learning.ru/v2/group-10',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UxMmRmNDU5Yjk4YjAzOGY3N2IyMjgiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1NzAxNzgwLCJleHAiOjE3MDcyMzc3ODB9.zyudBlyMJGJX7MyT2kglcsfV5h-RFGpaT7KCgoV76Sw'
}

const api = new Api(config)

export default api;