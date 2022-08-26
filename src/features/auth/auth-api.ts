import {instanceLocal} from "../../api/api-instance";

export const authApi = {
    registration(email: string, password: string) {
        return instanceLocal.post('/auth/register', {email,password})
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe?: boolean) {
        return instanceLocal.post('auth/login', {email, password, rememberMe})
            .then(res => res.data)
    },
    logout() {
        return instanceLocal.delete('auth/me')
            .then(res => res.data)
    },
    me() {
        return instanceLocal.post<UserType>(`/auth/me`, {})
            .then(res => res.data)
    },
    updateUserData(name: string) {
        return instanceLocal.put<UpdatedUser>(`/auth/me`, {name})
            .then(res => res.data)
    },

}





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

