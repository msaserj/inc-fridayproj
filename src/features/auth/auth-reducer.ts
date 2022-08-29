import {Dispatch} from "redux";
import {AppThunkType} from "../../App/store";
import {AppActionsType, setAppErrorAC, setAppIsLoadingAC} from "../../App/app-reducer";

import {authApi, UserType} from "./auth-api";

// types
export type AuthActionsType =
    | ReturnType<typeof registrationAC>
    | ReturnType<typeof loginAC>
    | ReturnType<typeof logoutAC>
    | ReturnType<typeof authMeAC>
    | ReturnType<typeof setUserNameAC>
// | ReturnType<typeof loadingStatusAC>

type ThunkDispatchType = Dispatch<AuthActionsType | AppActionsType>

// ActionCreators
export const loginAC = (payload: InitStateType) => ({type: "AUTH/LOGIN", payload} as const);
export const logoutAC = () => ({type: "AUTH/LOGOUT"} as const);
export const authMeAC = (payload: InitStateType) => ({type: "AUTH/AUTH_ME", payload} as const);
export const setUserNameAC = (payload: UserType) => ({type: "AUTH/SET-USER-DATA", payload} as const);
//export const loadingStatusAC = (value: boolean) => ({type: "AUTH/LOADING-STATUS", value} as const);
export const registrationAC = (condition: boolean) => ({type: "AUTH/SET-REGISTRATION", condition} as const);

// reducers

type InitStateType = {
    loggedIn: boolean
    successfulRegistration: boolean
    user: UserType
};
const InitialState: InitStateType = {
    loggedIn: false,
    successfulRegistration: false,
    user: {
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

    }
}


export const authReducer = (state: InitStateType = InitialState, action: AuthActionsType): InitStateType => {
    switch (action.type) {
        case "AUTH/AUTH_ME":
            return {...action.payload}
        case "AUTH/LOGIN":
            return {...action.payload}
        case "AUTH/LOGOUT":
            return {...state}
        case "AUTH/SET-USER-DATA":
            return {...state,  user: action.payload};
        // case "AUTH/LOADING-STATUS":
        //     return {...state, loading: action.value}
        case "AUTH/SET-REGISTRATION":
            return {...state, successfulRegistration: action.condition}
        default:
            return state;
    }
}

// sanki
export const loginThunkTC = (email: string, password: string, remember: boolean): AppThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.login(email, password, remember)
        .then(res => {
            console.log(50, res)
            dispatch(setUserNameAC(res));
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

export const logoutThunkTC = (): AppThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.logout()
        .then(res => {
            console.log(50, res)
            dispatch(setUserNameAC(res));
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

export const updateUserDataTC = (name: string): AppThunkType => (dispatch: ThunkDispatchType) => {

    dispatch(setAppIsLoadingAC(true))
    authApi.updateUserName(name)
        .then(res => {
            console.log(50, res)
            // dispatch(setAuthDataAC(res)); !!!!!!!!!!!!!!
            dispatch(setUserNameAC(res.updatedUser)); // AgeevDmitry добавил dispatch для updatedUser
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
export const registrationThunkTC = (email: string, password: string): AppThunkType => (dispatch: ThunkDispatchType) => {

    dispatch(setAppIsLoadingAC(true))
    authApi.registration(email, password)
        .then(res => {
            console.log(res)
            dispatch(registrationAC(true))
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

