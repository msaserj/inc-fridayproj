import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch } from "redux-thunk";



const rootReducer = combineReducers({

})

const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppStateType = ReturnType<typeof rootReducer>

//export type AppReducersTypes = AppReducerType | AuthReducerType | PacksReducerType | CardsReducerType
type RootStateType = ReturnType<typeof store.getState>
type AppDispatchType = ThunkDispatch<RootStateType, unknown,any/* AppReducersTypes*/>


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown,any/* AppReducersTypes*/>

export default store;

// @ts-ignore
window.store