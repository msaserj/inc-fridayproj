import {applyMiddleware, combineReducers, compose, createStore, legacy_createStore} from 'redux';
import thunk, {ThunkDispatch, ThunkAction} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {LoginActionsType, loginReducer} from "../features/auth/login/login-reducer";
import {ProfileActionsType, profileReducer} from "../features/auth/profile-reducer";
import {AppActionsType, appReducer} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {RegistrationActionsType, registrationReducer} from "../features/auth/registration-reducer";


// для работы с REDUX_DEVTOOLS: Window c Большой Буквы Window
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loadState = () => {
	try {
		const serializedState = localStorage.getItem('app-state')
		if (serializedState === null) {
			return undefined
		}
		return JSON.parse(serializedState)
	} catch (err) {
		return undefined
	}
}

const saveState = (state: AppStateType) => {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem('app-state', serializedState)
	} catch {
		// ignore write errors
	}
}



export type AppStateType = ReturnType<typeof rootReducer>;

export type RootActionsType =
    | LoginActionsType
    | ProfileActionsType
    | AppActionsType
    | RegistrationActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, RootActionsType>;

export const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    app: appReducer,
    registration: registrationReducer
});

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
//export const store = legacy_createStore(rootReducer, loadState(), composeEnhancers(applyMiddleware(thunk)));
//на поддержке посоветовали переписать store на новый метод store
export const store = configureStore({reducer: rootReducer})

export type AppDispatchType = ThunkDispatch<AppStateType, unknown, RootActionsType>;

export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
//type AppActionsType = FirstActionsType | SecondActionsType


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
