import {AppThunkType} from "../../App/store";
import {setAppIsLoadingAC} from "../../App/app-reducer";
import {packCardsApi, PacksType} from "./packCards-api";
import {handleAppRequestError} from "../../common/utils/error-utils";

// types AC
type GetCardsPackActionType =
    ReturnType<typeof getCardsPackAC> |
    ReturnType<typeof setCardPacksTotalCountAC> |
    ReturnType<typeof setCurrentPageCardPacksAC> |
    ReturnType<typeof setCurrentFilterAC> |
    ReturnType<typeof setViewPacksAC> |
    ReturnType<typeof setSearchResultAC> |
    ReturnType<typeof filterCardsCountAC>

type InitStateType = typeof initState;
export type PacksListActionsType = GetCardsPackActionType

// Action creators
export const getCardsPackAC = (cardPacks: PacksType[]) =>
    ({type: 'packsList/GET-CARDS-PACK', payload: {cardPacks}} as const);
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) =>
    ({type: 'packsList/SET-CARD-PACKS-TOTAL-COUNT', payload: {cardPacksTotalCount}} as const);
export const setCurrentPageCardPacksAC = (page: number) =>
    ({type: 'packsList/SET-CURRENT-PAGE', payload: {page}} as const);
export const setCurrentFilterAC = (filter: string) =>
    ({type: 'packsList/SET-CURRENT-FILTER', payload: {filter}} as const);
export const setViewPacksAC = (isMyPacks: boolean) =>
    ({type: 'packsList/SET-VIEW-PACKS', payload: {isMyPacks}} as const);
export const setSearchResultAC = (searchResult: string) =>
    ({type: 'packsList/SET-SEARCH-RESULT', payload: {searchResult}} as const);
export const filterCardsCountAC = (min: number, max: number) =>
    ({type: 'packsList/FILTER-CARDS-COUNT', cardsCount: {min, max}} as const);


// Initial state
const initState = {
    cardPacks: [] as PacksType[],
    pageCount: 10,
    cardPacksTotalCount: 0,
    min: 0,
    max: 10,
    cardsCount: {
        maxCardsCount: 0,
        minCardsCount: 0,
    },
    page: 1,
    filter: '0updated' as string,
    isMyPacks: false,
    searchResult: '',
};

// reduser
export const packsListReducer = (state: InitStateType = initState, action: PacksListActionsType): InitStateType => {
    switch (action.type) {
        case 'packsList/GET-CARDS-PACK':
            return {...state, ...action.payload}
        case 'packsList/SET-CARD-PACKS-TOTAL-COUNT':
            return {...state, ...action.payload}
        case 'packsList/SET-CURRENT-PAGE':
            return {...state, ...action.payload}
        case 'packsList/SET-CURRENT-FILTER':
            return {...state, ...action.payload}
        case 'packsList/SET-VIEW-PACKS':
            return {...state, ...action.payload}
        case 'packsList/SET-SEARCH-RESULT':
            return {...state, ...action.payload}
        case 'packsList/FILTER-CARDS-COUNT':
            return {...state, ...action.cardsCount};
        default:
            return state;
    }
};


// sanki
export const getCardsPackThunk = (): AppThunkType => (dispatch, getState) => {
    const {pageCount, page, filter, isMyPacks, searchResult, min, max} = getState().packsList;
    const {_id} = getState().auth.user;
    const user_id = isMyPacks ? _id : '';
    const packName = searchResult ? searchResult : '';
    dispatch(setAppIsLoadingAC(true));
    packCardsApi.getCardsPack({
        pageCount,
        page,
        sortPacks: filter,
        user_id,
        packName,
        min,
        max,
    })
        .then(res => {
            dispatch(getCardsPackAC(res.cardPacks));
            dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setAppIsLoadingAC(false));
        })
};

// export const getMyCardsPackThunk = (): AppThunkType => (dispatch, getState) => {
//     const {_id} = getState().auth.user;
//     const {pageCount} = getState().packsList;
//     dispatch(setAppIsLoadingAC(true));
//     dispatch(setSearchResultAC(''));
//     dispatch(setCurrentFilterAC('0updated'));
//     packCardsApi.getCardsPack({user_id: _id, pageCount})
//         .then(res => {
//             dispatch(getCardsPackAC(res.cardPacks));
//             dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
//         })
//         .catch(error => handleAppRequestError(error, dispatch))
//         .finally(() => dispatch(setAppIsLoadingAC(false)));
// };

export const searchCardsPackThunk = (packName: string, min: any, max: any): AppThunkType => (
    dispatch, getState) => {
    const {pageCount, isMyPacks} = getState().packsList;
    const {_id} = getState().auth.user;
    const user_id = isMyPacks ? _id : '';
    dispatch(setAppIsLoadingAC(true))
    packCardsApi.getCardsPack({pageCount, packName, user_id, min, max})
        .then(res => {
            dispatch(getCardsPackAC(res.cardPacks));
            dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC(false)));
};

export const sortCardsPackThunk = (sortPacks: string): AppThunkType => (
    dispatch, getState) => {
    const {pageCount, isMyPacks, searchResult} = getState().packsList;
    const packName = searchResult ? searchResult : '';
    const {_id} = getState().auth.user;
    const user_id = isMyPacks ? _id : '';
    dispatch(setAppIsLoadingAC(true));
    dispatch(setCurrentFilterAC(sortPacks));
    packCardsApi.getCardsPack({pageCount, sortPacks, user_id, packName})
        .then(res => {
            dispatch(getCardsPackAC(res.cardPacks));
            dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC(false)));
};

export const addNewPackThunk = (name: string, makePrivate: boolean): AppThunkType => (dispatch => {
    dispatch(setAppIsLoadingAC(true));
    packCardsApi.addNewPack(name, makePrivate)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC(false)));
});

export const deleteCardsPackThunk = (id: string): AppThunkType => (dispatch => {
    dispatch(setAppIsLoadingAC(true));
    packCardsApi.deleteCardsPack(id)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC(false)));
});

export const updateCardsPackThunk = (id: string, name: string, privatePack: boolean): AppThunkType => (dispatch => {
    dispatch(setAppIsLoadingAC(true));
    packCardsApi.updateCardsPack(id, name, privatePack)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC(false)))
})

