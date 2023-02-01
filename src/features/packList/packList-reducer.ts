import {AppThunkType, RootState} from "../../App/store";
import {setAppIsLoadingAC} from "../../App/app-reducer";
import {packCardsApi, PacksType} from "./packCards-api";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";


// Initial state
const initState = {
    cardPacks: [] as PacksType[],
    page: 1,
    pageCount: 10,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,

    filter: '0updated' as string,
    isMyPacks: undefined as string | undefined, // string если мой паки, undefined если All packs
    searchResult: '',
};

export const slice = createSlice({
    name: 'packList',
    initialState: initState,
    reducers: {
        getCardsPackAC:  (state, action: PayloadAction<{cardPacks: PacksType[]}>) => {
            state.cardPacks = action.payload.cardPacks
        },
        setCardPacksTotalCountAC:  (state, action: PayloadAction<{cardPacksTotalCount: number}>) => {
            state.cardPacksTotalCount = action.payload.cardPacksTotalCount
        },
        setCurrentPageCardPacksAC:  (state, action: PayloadAction<{page: number}>) => {
            state.page = action.payload.page
        },
        setCurrentFilterAC:  (state, action: PayloadAction<{filter: string}>) => {
            state.filter = action.payload.filter
        },
        setViewPacksAC:  (state, action: PayloadAction<{isMyPacks?: string}>) => {
            state.isMyPacks = action.payload.isMyPacks
        },
        setSearchResultAC:  (state, action: PayloadAction<{searchResult: string}>) => {
            state.searchResult = action.payload.searchResult
        },
        filterCardsCountAC:  (state, action: PayloadAction<{min: number, max: number}>) => {
            state.maxCardsCount = action.payload.max;
            state.minCardsCount = action.payload.min;
        },
        setMaxCardsCountAC:  (state, action: PayloadAction<{maxCardsCount: number}>) => {
            state.maxCardsCount = action.payload.maxCardsCount
        }
    }
})

export const packsListReducer = slice.reducer

// Action Creators
export const {getCardsPackAC, setCardPacksTotalCountAC, setCurrentPageCardPacksAC, setCurrentFilterAC,
    setMaxCardsCountAC, setViewPacksAC, setSearchResultAC, filterCardsCountAC} = slice.actions

// sanki
export const getCardsPackThunk = (): AppThunkType => (dispatch: Dispatch, getState: ()=> RootState) => {
    const {pageCount, page, filter, isMyPacks, searchResult, minCardsCount, maxCardsCount} = getState().packsList;
    const {_id} = getState().auth.user;
    const user_id = isMyPacks ? _id : '';
    const packName = searchResult ? searchResult : '';
    dispatch(setAppIsLoadingAC({value: true}));
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
            dispatch(setMaxCardsCountAC({maxCardsCount: res.maxCardsCount}))
            console.log(res.maxCardsCount)
            dispatch(getCardsPackAC({cardPacks: res.cardPacks}));
            dispatch(setCardPacksTotalCountAC({cardPacksTotalCount: res.cardPacksTotalCount}));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(setAppIsLoadingAC({value: false}));
        })
};

export const searchCardsPackThunk = (packName: string, minCardsCount: any, maxCardsCount: any, pageCount: number, useId?: string): AppThunkType => (
    dispatch: Dispatch) => {
    dispatch(setAppIsLoadingAC({value: true}))
    packCardsApi.getCardsPack({pageCount, packName, user_id: useId, min: minCardsCount, max: maxCardsCount})
        .then(res => {
            dispatch(setMaxCardsCountAC({maxCardsCount: res.maxCardsCount}))
            // console.log("TC", res.maxCardsCount)
            dispatch(getCardsPackAC({cardPacks: res.cardPacks}));
            dispatch(setCardPacksTotalCountAC({cardPacksTotalCount: res.cardPacksTotalCount}));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC({value: false})));
};

export const sortCardsPackThunk = (sortPacks: string): AppThunkType => (
    dispatch: Dispatch, getState: ()=> RootState) => {
    const {pageCount, searchResult} = getState().packsList;
    const {_id} = getState().auth.user;
    dispatch(setAppIsLoadingAC({value: true}));
    dispatch(setCurrentFilterAC({filter: sortPacks}));
    packCardsApi.getCardsPack({pageCount, sortPacks, user_id: _id, packName: searchResult})
        .then(res => {
            dispatch(getCardsPackAC({cardPacks: res.cardPacks}));
            dispatch(setCardPacksTotalCountAC({cardPacksTotalCount: res.cardPacksTotalCount}));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC({value: false})));
};

export const addNewPackThunk = (name: string, makePrivate: boolean): AppThunkType => (dispatch) => {
    dispatch(setAppIsLoadingAC({value: true}));
    packCardsApi.addNewPack(name, makePrivate)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC({value: false})));
};

export const deleteCardsPackThunk = (id: string): AppThunkType => (dispatch) => {
    dispatch(setAppIsLoadingAC({value: true}));
    packCardsApi.deleteCardsPack(id)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC({value: false})));
};

export const updateCardsPackThunk = (id: string, name: string, privatePack: boolean): AppThunkType => (dispatch) => {
    dispatch(setAppIsLoadingAC({value: true}));
    packCardsApi.updateCardsPack(id, name, privatePack)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC({value: false})))
};

