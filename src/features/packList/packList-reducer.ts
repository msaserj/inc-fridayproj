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
    ({type: 'packsList/GET-CARDS-PACK', cardPacksPayload: {cardPacks}} as const);
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) =>
    ({type: 'packsList/SET-CARD-PACKS-TOTAL-COUNT', cardPacksTotalCount} as const);
export const setCurrentPageCardPacksAC = (page: number) =>
    ({type: 'packsList/SET-CURRENT-PAGE', page} as const);
export const setCurrentFilterAC = (filter: string) =>
    ({type: 'packsList/SET-CURRENT-FILTER', filter} as const);
export const setViewPacksAC = (isMyPacks: boolean) =>
    ({type: 'packsList/SET-VIEW-PACKS', isMyPacks} as const);
export const setSearchResultAC = (searchResult: string) =>
    ({type: 'packsList/SET-SEARCH-RESULT', searchResult} as const);
export const filterCardsCountAC = (min: number, max: number) =>
    ({type: 'packsList/FILTER-CARDS-COUNT', cardsCount: {min, max}} as const);


// Initial state
const initState = {
    cardPacks: [] as PacksType[],
    page: 1,
    pageCount: 10,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 10,

    filter: '0updated' as string,
    isMyPacks: false,
    searchResult: '',
};

// reduser
export const packsListReducer = (state: InitStateType = initState, action: PacksListActionsType): InitStateType => {
    switch (action.type) {
        case 'packsList/GET-CARDS-PACK':
            return {...state, ...action.cardPacksPayload}
        case 'packsList/SET-CARD-PACKS-TOTAL-COUNT':
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case 'packsList/SET-CURRENT-PAGE':
            return {...state, page: action.page}
        case 'packsList/SET-CURRENT-FILTER':
            return {...state, filter: action.filter}
        case 'packsList/SET-VIEW-PACKS':
            return {...state, isMyPacks: action.isMyPacks}
        case 'packsList/SET-SEARCH-RESULT':
            return {...state, searchResult: action.searchResult}
        case 'packsList/FILTER-CARDS-COUNT':
            return {...state, ...action.cardsCount};
        default:
            return state;
    }
};


// sanki
export const getCardsPackThunk = (): AppThunkType => (dispatch, getState) => {
    const {pageCount, page, filter, isMyPacks, searchResult, minCardsCount, maxCardsCount} = getState().packsList;
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
        min: minCardsCount,
        max: maxCardsCount,
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

export const searchCardsPackThunk = (packName: string, minCardsCount: any, maxCardsCount: any): AppThunkType => (
    dispatch, getState) => {
    const {pageCount, isMyPacks} = getState().packsList;
    const {_id} = getState().auth.user;
    const user_id = isMyPacks ? _id : '';
    dispatch(setAppIsLoadingAC(true))
    packCardsApi.getCardsPack({pageCount, packName, user_id, min: minCardsCount, max: maxCardsCount})
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

