import {AppThunkType} from "./store";
import {ProfileApi} from "../features/profile/profile-api";
import {setAuthDataAC} from "../features/profile/profile-reducer";

type InitStateType = typeof initState;

const initState = {
	appIsInitialized: false,
	appIsLoading: false,
	appError: null as null | string,
};

type SetAppInitializedActionType = ReturnType<typeof setAppIsInitializedAC>;
type SetAppIsLoadingActionType = ReturnType<typeof setAppIsLoadingAC>;
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type AppActionsType =
	| SetAppInitializedActionType
	| SetAppIsLoadingActionType
	| SetAppErrorActionType;


export const setAppIsInitializedAC = (value: boolean) =>
	({type: "app/SET-INITIALIZED", payload: {appIsInitialized: value}} as const);
export const setAppErrorAC = (value: null | string) =>
	({type: "app/SET-ERROR", payload: {appError: value}} as const);
export const setAppIsLoadingAC = (value: boolean) =>
	({type: "app/SET-IS-LOADING", payload: {appIsLoading: value}} as const);



// Thunk creators
export const initializeAppTC = (): AppThunkType => (dispatch) => {
	ProfileApi.me()
		.then(data => {
			dispatch(setAuthDataAC(data));
		})
		.catch(error => {
			const errorMessage = error.response
				? error.response.data.error
				: (error.message + ', more details in the console');
			console.log('Error: ', errorMessage);
		})

		.finally(() => dispatch(setAppIsInitializedAC(true)))
};

export const appReducer = (state: InitStateType = initState, action: AppActionsType): InitStateType => {
	switch (action.type) {
		case "app/SET-INITIALIZED":
		case "app/SET-IS-LOADING":
		case "app/SET-ERROR":
			return {...state, ...action.payload};
		default:
			return state;
	}
};
