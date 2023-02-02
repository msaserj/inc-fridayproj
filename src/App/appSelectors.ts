import {AppRootStateType} from "./store";


// primitive selector

export const getIsLoadingApp = (state: AppRootStateType) => state.app.appIsLoading;
export const getAppError = (state: AppRootStateType) => state.app.appError;
export const getAppIsInitialized = (state: AppRootStateType) => state.app.appIsInitialized;
export const getIsLoggedIn = (state: AppRootStateType) => state.app.isLoggedIn;


// super selector
// export const getUsersSuperSelector = createSelector(getIsLoadingApp, (cards)=>{
//     // return cards.filter(e=> true)
// })