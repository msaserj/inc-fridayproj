import {combineReducers, compose} from 'redux';
import {ThunkDispatch, ThunkAction} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {AuthActionsType, authReducer} from "../features/auth/auth-reducer";
import {PacksListActionsType, packsListReducer} from "../features/packList/packList-reducer";
import {CardsListActionsType, cardsListReducer} from "../features/cardList/cardList-reducer";


export const rootReducer = combineReducers({
	auth: authReducer,
	app: appReducer,
	packsList: packsListReducer,
	cardsList: cardsListReducer,
});

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
//export const store = legacy_createStore(rootReducer, loadState(), composeEnhancers(applyMiddleware(thunk)));
//на поддержке посоветовали переписать store на новый метод store
export const store = configureStore({reducer: rootReducer})

export type RootActionsType =
	| AppActionsType
	| AuthActionsType
	| PacksListActionsType
	| CardsListActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, RootActionsType>;

export type AppDispatchType = ThunkDispatch<AppStateType, unknown, RootActionsType>;
export type AppStateType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>


// @ts-ignore
window.store = store

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


