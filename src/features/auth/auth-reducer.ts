import {Dispatch} from "redux";
import {AppThunkType} from "../../App/store";
import {AppActionsType, setAppIsLoadingAC} from "../../App/app-reducer";
import {authApi, UserType} from "./auth-api";
import {handleAppRequestError} from "../../common/utils/error-utils";

// types AC
export type AuthActionsType =
    | ReturnType<typeof registrationAC>
    | ReturnType<typeof loginAC>
    | ReturnType<typeof logoutAC>
    | ReturnType<typeof authMeAC>
    | ReturnType<typeof setUserNameAC>
    | ReturnType<typeof recoveryPswdAC>
    | ReturnType<typeof newPswdAC>

type ThunkDispatchType = Dispatch<AuthActionsType | AppActionsType>

// ActionCreators
export const loginAC = (payload: InitStateType) => ({type: "AUTH/LOGIN", payload} as const);
export const logoutAC = () => ({type: "AUTH/LOGOUT"} as const);
export const authMeAC = (payload: InitStateType) => ({type: "AUTH/AUTH_ME", payload} as const);
export const setUserNameAC = (payload: UserType) => ({type: "AUTH/SET-USER-DATA", payload} as const);
export const registrationAC = (condition: boolean) => ({type: "AUTH/SET-REGISTRATION", condition} as const);
export const recoveryPswdAC = (payload: RecoveryPswdType) => ({type: "AUTH/RECOVERY-PSWD", payload} as const);
export const newPswdAC = (payload: NewPswdType) => ({type: "AUTH/NEW-PSWD", payload} as const);

// types



type NewPswdType = {
    password: string
    token: string
}
type RecoveryPswdType = {
    email: string
    from: string
    message: string
}

type InitStateType = {
    loggedIn: boolean
    successfulRegistration: boolean
    user: UserType
    RecoveryPswd: RecoveryPswdType
    newPswd: NewPswdType
};
const InitialState: InitStateType = {
    loggedIn: false,
    successfulRegistration: false,
    RecoveryPswd: {
        email: "",
        from: "",
        message: ""
    },
    newPswd: {
        password: "",
        token: ""
    },
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
// reducers
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
        case "AUTH/SET-REGISTRATION":
            return {...state, successfulRegistration: action.condition}
        case "AUTH/RECOVERY-PSWD":
            return {...state, RecoveryPswd: action.payload}
         case "AUTH/NEW-PSWD":
            return {...state, newPswd: action.payload}
        default:
            return state;
    }
}
// sanki
export const loginThunkTC = (email: string, password: string, remember: boolean): AppThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.login(email, password, remember)
        .then(res => {
            dispatch(setUserNameAC(res));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setAppIsLoadingAC(false))
        })
};

export const logoutThunkTC = (): AppThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.logout()
        .then(res => {
            dispatch(setUserNameAC(res));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {dispatch(setAppIsLoadingAC(false))})
};

export const updateUserDataTC = (name: string): AppThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.updateUserName(name)
        .then(res => {
            // dispatch(setAuthDataAC(res)); !!!!!!!!!!!!!!
            dispatch(setUserNameAC(res.updatedUser)); // AgeevDmitry добавил dispatch для updatedUser
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {dispatch(setAppIsLoadingAC(false))})
};

export const registrationThunkTC = (email: string, password: string): AppThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.registration(email, password)
        .then(res => {
            dispatch(registrationAC(true))
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {dispatch(setAppIsLoadingAC(false))})
};
export const recoveryPswdThunkTC = (email: string, from: string, message: string): AppThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.forgotPswd(email, from, message)
        .then(res => {
            dispatch(recoveryPswdAC({email, from, message}))
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {dispatch(setAppIsLoadingAC(false))})
};
export const newPswdThunkTC = (password: string, token: string): AppThunkType => (dispatch: ThunkDispatchType) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.newPswd(password, token)
        .then(res => {
            dispatch(newPswdAC({password, token}))
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {dispatch(setAppIsLoadingAC(false))})
};

