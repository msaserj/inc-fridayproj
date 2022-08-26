import axios from "axios";


const instance = axios.create({
	// baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/', // для запросов на смену пароля менять урл на https://neko-back.herokuapp.com/2.0/
	baseURL: 'https://neko-back.herokuapp.com/2.0/',
	withCredentials: true,
})

export const authApi = {

	login(email: string, password: string, rememberMe?: boolean) {
		return instance.post('auth/login', {email, password, rememberMe}).then(res => res.data)
	},
	logout() {
		return instance.delete('auth/me').then(res => res.data)
	}
}
