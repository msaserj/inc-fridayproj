import {applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux';
import thunk, {ThunkDispatch, ThunkAction} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {LoginActionsType, loginReducer} from "../features/auth/login/login-reducer";
import {ProfileActionsType, profileReducer} from "../features/profile/profile-reducer";
import {AppActionsType, appReducer} from "./app-reducer";

export type AppStateType = ReturnType<typeof rootReducer>;

export type RootActionsType =
	| LoginActionsType
	| ProfileActionsType
	| AppActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, RootActionsType>;

export const rootReducer = combineReducers({
	login: loginReducer,
	profile: profileReducer,
	app: appReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatchType = ThunkDispatch<AppStateType, unknown, RootActionsType>;

export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
//type AppActionsType = FirstActionsType | SecondActionsType


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
