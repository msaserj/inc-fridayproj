import {AppThunkType} from "./store";
import {Dispatch} from "redux";
import {AuthActionsType, setUserNameAC} from "../features/auth/auth-reducer";
import {authApi} from "../features/auth/auth-api";


type InitStateType = typeof initState;
const initState = {
	appIsInitialized: false,
	appIsLoading: false,
	appError: null as null | string
};

type SetAppInitializedActionType = ReturnType<typeof setAppIsInitializedAC>;
type SetAppIsLoadingActionType = ReturnType<typeof setAppIsLoadingAC>;
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type AppActionsType =
	| SetAppInitializedActionType
	| SetAppIsLoadingActionType
	| SetAppErrorActionType;
type ThunkDispatchType = Dispatch<AuthActionsType | AppActionsType>

// Action Creators
export const setAppIsInitializedAC = (value: boolean) =>
	({type: "app/SET-INITIALIZED", payload: {appIsInitialized: value}} as const);
export const setAppErrorAC = (value: null | string) =>
	({type: "app/SET-ERROR", payload: {appError: value}} as const);
export const setAppIsLoadingAC = (value: boolean) =>
	({type: "app/SET-IS-LOADING-STATUS", payload: {appIsLoading: value}} as const);

// reducer
export const appReducer = (state: InitStateType = initState, action: AppActionsType): InitStateType => {
	switch (action.type) {
		case "app/SET-INITIALIZED":
			return {...state, ...action.payload};
		case "app/SET-IS-LOADING-STATUS":
			return {...state, ...action.payload};
		case "app/SET-ERROR":
			return {...state, ...action.payload};
		default:
			return state;
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

export const initializeAppTC = (): AppThunkType => async (dispatch:ThunkDispatchType) => {
	try{
		const res = await authApi.me()
		dispatch(setUserNameAC(res));
	}
	catch (error:any) {
			const errorMessage = error.response
				? error.response.data.error
				: (error.message + ', more details in the console');
			console.log('Error: ', errorMessage);
		}
	finally {
		dispatch(setAppIsInitializedAC(true))
	}
};
