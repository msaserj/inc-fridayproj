//заглушка редьюсера. Не стал делать для всех такую же

import {Dispatch} from "redux";
import {setAuthDataAC} from "../../profile/profile-reducer";
import {authApi} from "./login-api";
import {AppThunkType} from "../../../App/store";
import {setAppErrorAC, setAppIsLoadingAC} from "../../../App/app-reducer";

type InitStateType = typeof initState;

// ActionCreators
export const loginAC = (payload: InitStateType) => ({type: "login/LOGIN", payload} as const);
export const logoutAC = () => ({type: "login/LOGOUT"} as const);
export const authMeAC = (payload: InitStateType) => ({type: "login/AUTH_ME", payload} as const);

// reducers
const initState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: 0,
    updated: 0,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,

    error: '',  //ошибки от сервера
};
export const loginReducer = (state: InitStateType = initState, action: LoginActionsType): InitStateType => {
    switch (action.type) {
        case "login/AUTH_ME":
            return {...action.payload}
        case "login/LOGIN":
            return {...action.payload}
        case "login/LOGOUT":
            return {...initState}
        default:
            return state;
    }
}

// sanki
export const loginThunkTC = (email: string, password: string, remember: boolean): AppThunkType => (dispatch) => {

    dispatch(setAppIsLoadingAC(true))
    authApi.login(email, password, remember)
        .then(res => {
            console.log(50, res.name)
            dispatch(setAuthDataAC(res));
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');

            console.log(error)

            dispatch(setAppErrorAC(error));
        })
        .finally(() => {

            dispatch(setAppIsLoadingAC(false))
        })
};

// types
export type LoginActionsType =
    ReturnType<typeof loginAC>
    | ReturnType<typeof logoutAC>
    | ReturnType<typeof authMeAC>

type InitialStateType = {
    value: boolean
}

type ThunkDispatchType = Dispatch<LoginActionsType>
