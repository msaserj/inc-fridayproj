import {AppRootStateType} from "../../App/store";


// primitive selector
export const getIsFetchingCards = (state: AppRootStateType): boolean => state.cardsList.isFetchingCards;
export const getCurrentPage = (state: AppRootStateType): number => state.packsList.page;
export const getPageSize = (state: AppRootStateType): number => state.packsList.pageCount;
export const getTotalCountPage = (state: AppRootStateType): number => state.packsList.cardPacksTotalCount;

// super selector
// export const getUsersSuperSelector = createSelector(getCards, (cards)=>{
//     // return cards.filter(e=> true)
// })