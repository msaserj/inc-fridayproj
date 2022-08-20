
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({

});

//export const store = createStore(rootRedcer, applyMiddleware(thunk));

//export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
//type AppActionsType = FirstActionsType | SecondActionsType



// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
