import axios from "axios";

const instance = axios.create({
	// baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/', // для запросов на смену пароля менять урл на https://neko-back.herokuapp.com/2.0/
	baseURL: 'https://neko-back.herokuapp.com/2.0/',
	withCredentials: true,
})

export type UserType = {
	_id: string;
	email: string;
	name: string;
	avatar?: string;
	publicCardPacksCount: number; // количество колод
	created: Date;
	updated: Date;
	isAdmin: boolean;
	verified: boolean; // подтвердил ли почту
	rememberMe: boolean;
	error?: string;
}
export type UpdatedUser = {
	token: string
	tokenDeathTime: Date
	updatedUser: UserType
}


export const ProfileApi = {
	me() {
		return instance.post<UserType>(`/auth/me`, {})
			.then(res => res.data)
	},
	updateUserData(name: string, avatar: string) {
		return instance.put<UpdatedUser>(`/auth/me`, {name, avatar})
			.then(res => res.data)
	},
}
