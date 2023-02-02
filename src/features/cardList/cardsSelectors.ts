import {AppRootStateType} from "../../App/store";
import {CardType} from "./cards-api";
import {randomCardType} from "./cardList-reducer";

// primitive selector
export const getCards = (state: AppRootStateType): Array<CardType> => state.cardsList.cardsData.cards;
export const getIsFetchingCards = (state: AppRootStateType): boolean => state.cardsList.isFetchingCards;
export const getPackName = (state: AppRootStateType): string => state.cardsList.packName;
export const getPackUserId = (state: AppRootStateType): undefined | string => state.cardsList.cardsData.packUserId;
export const getCardQuestion = (state: AppRootStateType): string => state.cardsList.cardQuestion;
export const getCurrentFilter = (state: AppRootStateType): string => state.cardsList.sortCards;
export const getCurrentPage = (state: AppRootStateType): number => state.cardsList.cardsData.page;
export const getLoadingModal = (state: AppRootStateType): boolean => state.cardsList.loadingModal;
export const getRandomCard = (state: AppRootStateType): randomCardType => state.cardsList.randomCard;


// super selector
// export const getUsersSuperSelector = createSelector(getCards, (cards)=>{
//     // return cards.filter(e=> true)
// })