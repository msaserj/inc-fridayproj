
// endPoints API
import {instance} from "../../api/api-instance";

export const authApi = {
    registration(email: string, password: string) {
        return instance.post('/auth/register', {email,password})
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe?: boolean) {
        return instance.post('auth/login', {email, password, rememberMe})
            .then(res => res.data)
    },
    logout() {
        return instance.delete('auth/me')
            .then(res => res.data)
    },
    forgotPswd(email: string, from: string, message: string) {
        return instance.post('auth/forgot', {email, from, message}).then(res => res.data)
    },
    me() {
        return instance.post<UserType>(`/auth/me`, {})
            .then(res => res.data)
    },
    newPswd(password: string, resetPasswordToken: string) {
        return instance.post('auth/set-new-password', {password, resetPasswordToken}).then(res => res.data)
    },
    updateUserName(name: string) {
        return instance.put<UpdatedUser>(`/auth/me`, {name})
            .then(res => res.data)
    },
    updateUserAvatar(name: string, avatar: string) {
        return instance.put<UpdatedUser>(`/auth/me`, {avatar})
            .then(res => res.data)
    },
}


export type UserType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean // подтвердил ли почту
    publicCardPacksCount: number // количество колод
    created: number
    updated: number
    // __v: number
    // token: string
    // tokenDeathTime: number
    avatar?: string
    error?: string
}

export type UpdatedUser = {
    token: string
    tokenDeathTime: Date
    updatedUser: UserType
}


