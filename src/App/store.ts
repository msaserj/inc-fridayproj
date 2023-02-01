import {combineReducers, compose} from 'redux';
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/auth/auth-reducer";
import {packsListReducer} from "../features/packList/packList-reducer";
import {cardsListReducer} from "../features/cardList/cardList-reducer";


export const rootReducer = combineReducers({
	auth: authReducer,
	app: appReducer,
	packsList: packsListReducer,
	cardsList: cardsListReducer,
});



// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
//export const store = legacy_createStore(rootReducer, loadState(), composeEnhancers(applyMiddleware(thunk)));
//на поддержке посоветовали переписать store на новый метод store
export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

export type AppDispatchType = typeof store.dispatch
export type AppStateType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>

export type RootReducerType = typeof rootReducer

export type AppDispatch = typeof store.dispatch
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, any>

export type AppRootStateType = ReturnType<RootReducerType>


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


