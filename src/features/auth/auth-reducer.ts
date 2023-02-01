import {Dispatch} from "redux";
import {AppThunkType} from "../../App/store";
import {setAppIsLoadingAC} from "../../App/app-reducer";
import {authApi, UserType} from "./auth-api";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


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
    successfulRegistration: boolean
    user: UserType
    RecoveryPswd: RecoveryPswdType
    newPswd: NewPswdType
    isLoggedIn:boolean
};
const InitialState: InitStateType = {
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

    },
    isLoggedIn: false
}

export  const slice = createSlice({
    name: 'auth',
    initialState: InitialState,
    reducers: {
        authMeAC(state, action: PayloadAction<{user: UserType}>) {
            state.user = action.payload.user
        },
        loginAC(state, action: PayloadAction<{user: UserType}>) {
            state.user = action.payload.user
        },
        setUserDataAC(state, action: PayloadAction<{user: UserType}>) {
            state.user = action.payload.user
        },
        logoutAC(state, action: PayloadAction<any>) {
            state = action.payload
        },
        registrationAC(state, action: PayloadAction<{successfulRegistration: boolean}>) {
            state.successfulRegistration = action.payload.successfulRegistration
        },
        recoveryPswdAC(state, action: PayloadAction<{RecoveryPswd: RecoveryPswdType}>) {
            state.RecoveryPswd = action.payload.RecoveryPswd
        },
        newPswdAC(state, action: PayloadAction<{newPswd: NewPswdType}>) {
            state.newPswd = action.payload.newPswd
        },
        isLoggedIn(state, action: PayloadAction<{isLoggedIn: boolean}>) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    }
})

export const authReducer = slice.reducer
// Action Creators
export const {authMeAC, loginAC, logoutAC, registrationAC, setUserDataAC, recoveryPswdAC, newPswdAC, isLoggedIn} = slice.actions

// sanki
export const loginThunkTC = (email: string, password: string, remember: boolean): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.login(email, password, remember)
        .then(res => {
            dispatch(setUserDataAC(res));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setAppIsLoadingAC(false))
        })
};

export const logoutThunkTC = (): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.logout()
        .then(res => {
            dispatch(setUserDataAC(res));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {dispatch(setAppIsLoadingAC(false))})
};
export const updateUserDataTC = (name: string): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.updateUserName(name)
        .then(res => {
            // dispatch(setAuthDataAC(res)); !!!!!!!!!!!!!!
            dispatch(setUserDataAC({user: res.updatedUser})); // AgeevDmitry добавил dispatch для updatedUser
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {dispatch(setAppIsLoadingAC(false))})
};

export const registrationThunkTC = (email: string, password: string): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.registration(email, password)
        .then(res => {
            dispatch(registrationAC({successfulRegistration: true}))
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {dispatch(setAppIsLoadingAC(false))})
};
export const recoveryPswdThunkTC = (email: string, from: string, message: string): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.forgotPswd(email, from, message)
        .then(res => {
            dispatch(recoveryPswdAC({RecoveryPswd: {email, from, message}}))
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {dispatch(setAppIsLoadingAC(false))})
};
export const newPswdThunkTC = (password: string, token: string): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingAC(true))
    authApi.newPswd(password, token)
        .then(res => {
            dispatch(newPswdAC({newPswd: {password, token}}))
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {dispatch(setAppIsLoadingAC(false))})
};

