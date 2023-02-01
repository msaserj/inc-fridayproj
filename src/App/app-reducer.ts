import {AppThunkType} from "./store";
import {Dispatch} from "redux";
import {isLoggedIn, setUserDataAC} from "../features/auth/auth-reducer";
import {authApi} from "../features/auth/auth-api";
import {handleAppRequestError} from "../common/utils/error-utils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Init state
const initState = {
    appIsInitialized: false,
    appIsLoading: false,
    appError: null as null | string,
    isLoggedIn: false,
};

// reducer
export const slice = createSlice({
    name: 'cards',
    initialState: initState,
    reducers: {
        setAppIsInitializedAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.appIsInitialized = action.payload.value
        },
        setAppErrorAC: (state, action: PayloadAction<{ value: null | string }>) => {
            state.appError = action.payload.value
        },
        setAppIsLoadingAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.appIsLoading = action.payload.value
        }
    }
})
export const appReducer = slice.reducer

// Action Creators
export  const {setAppIsInitializedAC, setAppErrorAC, setAppIsLoadingAC} = slice.actions

export const initializeAppTC = (): AppThunkType => async (dispatch: Dispatch) => {
    try {
        const res = await authApi.me()
        dispatch(setUserDataAC({user: res}));
        dispatch(isLoggedIn({isLoggedIn: true}))
    } catch (error) {
        handleAppRequestError(error as Error | AxiosError, dispatch)
    } finally {
        dispatch(setAppIsInitializedAC({value: true}))
    }
};


// Thunk creators
// export const initializeAppTC = (): AppThunkType => (dispatch:ThunkDispatchType) => {
// 	authApi.me()
// 		.then(data => {
// 			dispatch(setUserNameAC(data));
// 		})
// 		.catch(error => {
// 			const errorMessage = error.response
// 				? error.response.data.error
// 				: (error.message + ', more details in the console');
// 			console.log('Error: ', errorMessage);
// 		})
// 		.finally(() => dispatch(setAppIsInitializedAC(true)))
// };
