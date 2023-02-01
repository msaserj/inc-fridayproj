import {
    cardsAPI, CardType,
    GetCardsQueryParams,
    GetCardsResponseDataType,
    NewCardDataType,
    UpdateCardModelType, UpdatedGradeType
} from "./cards-api";
import {AppStateType, AppThunkType, RootState} from "../../App/store";
import {setAppIsLoadingAC} from "../../App/app-reducer";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {getCard} from "../../common/constants/random";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Initial state
export const stringInit = null as unknown as string
export const numberInit = null as unknown as number
const initState = {
    cardsData: {
        cards: [] as Array<CardType>,
        packUserId: undefined as undefined | string,
        cardsTotalCount: 0,
        maxGrade: undefined as undefined | number,
        minGrade: undefined as undefined | number,
        page: 1,
        pageCount: 10
    },
    cardAnswer: "",
    cardQuestion: "",
    sortCards: '0updated',
    isFetchingCards: false,
    packName: '',
    randomCard: {
        answer: stringInit,
        question: stringInit,
        cardsPack_id: stringInit,
        grade: numberInit,
        shots: numberInit,
        rating: numberInit,
        user_id: stringInit,
        created: stringInit,
        updated: stringInit,
        more_id: stringInit,
        _id: stringInit,
        type: stringInit,
        name: stringInit,
        cardsCount: numberInit
    },
    loadingModal: false
};

// reducer
export const slice = createSlice({
    name: 'cards',
    initialState: initState,
    reducers: {
        setCardsDataAC: (state, action: PayloadAction<{ cardsData: GetCardsResponseDataType }>) => {
            state.cardsData = action.payload.cardsData
        },
        setCurrentPageCardsListAC: (state, action: PayloadAction<{ page: number }>) => {
            state.cardsData.page = action.payload.page
        },
        setPageCountAC: (state, action: PayloadAction<{ pageCount: number }>) => {
            state.cardsData.pageCount = action.payload.pageCount
        },
        setIsFetchingCards: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isFetchingCards = action.payload.value
        },
        setSearchQueryByQuestionAC: (state, action: PayloadAction<{ value: string }>) => {
            state.cardQuestion = action.payload.value
        },
        setCardsSortDirectionAC: (state, action: PayloadAction<{ value: string }>) => {
            state.sortCards = action.payload.value
        },
        setPackNameAC: (state, action: PayloadAction<{ name: string }>) => {
            state.packName = action.payload.name
        },
        setRandomCard: (state, action: PayloadAction<{ randomCard: any }>) => {
            state.randomCard = action.payload.randomCard
        },
        setLoadingModal: (state, action: PayloadAction<{ loadingModal: boolean }>) => {
            state.loadingModal = action.payload.loadingModal
        },
        setChangeGradeCards: (state, action: PayloadAction<{ card: UpdatedGradeType }>) => {
            state.cardsData.cards = state.cardsData.cards = state.cardsData.cards.map(card =>
                card._id === action.payload.card.card_id
                    ? {...card, grade: action.payload.card.grade, shots: action.payload.card.shots}
                    : card);
        },
    }
})

export const cardsListReducer = slice.reducer

// Action Creators
export const {
    setChangeGradeCards, setIsFetchingCards, setCardsSortDirectionAC, setRandomCard, setCardsDataAC,
    setLoadingModal, setPageCountAC, setCurrentPageCardsListAC, setSearchQueryByQuestionAC, setPackNameAC
} = slice.actions

// Thunk creators
export const getCardsTC = (params: GetCardsQueryParams): AppThunkType => (dispatch, getState: () => RootState) => {

    const {cardAnswer, cardQuestion, sortCards} = getState().cardsList;
    const {page, pageCount} = getState().cardsList.cardsData
    const queryParams: GetCardsQueryParams = {cardAnswer, cardQuestion, sortCards, page, pageCount, ...params,};

    dispatch(setAppIsLoadingAC(true));
    dispatch(setIsFetchingCards({value: true}));

    cardsAPI.getCards(queryParams)
        .then(data => {
            dispatch(setCardsDataAC({cardsData: data}));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setAppIsLoadingAC(false));
            dispatch(setIsFetchingCards({value: false}));
        });
};
export const addNewCardTC = (newCard: NewCardDataType): AppThunkType => (dispatch) => {
    dispatch(setAppIsLoadingAC(true));
    cardsAPI.createCard(newCard)
        .then(() => {
            dispatch(getCardsTC({cardsPack_id: newCard.cardsPack_id}));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setAppIsLoadingAC(false));
        });
};
export const deleteCardTC = (cardsPack_ID: string, card_ID: string): AppThunkType => (dispatch, getState: () => RootState) => {
    const cardsArrLength = getState().cardsList.cardsData.cards.length;
    let currentPage = getState().cardsList.cardsData.page;

    if (cardsArrLength === 1 && currentPage !== 1) {
        currentPage -= 1;
    }

    dispatch(setAppIsLoadingAC(true));
    cardsAPI.deleteCard(card_ID)
        .then(() => {
            dispatch(getCardsTC({cardsPack_id: cardsPack_ID, page: currentPage}));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setAppIsLoadingAC(false));
        });
};
export const updateCardTC = (cardsPack_ID: string, cardModel: UpdateCardModelType): AppThunkType => (dispatch) => {
    dispatch(setAppIsLoadingAC(true));
    cardsAPI.updateCard(cardModel)
        .then(() => {
            dispatch(getCardsTC({cardsPack_id: cardsPack_ID}));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setAppIsLoadingAC(false));
        });
};

export const updateCardGradeTC = (cardsPack_ID: string, card_id: string, grade: number): AppThunkType => (dispatch) => {
    dispatch(setAppIsLoadingAC(true));
    cardsAPI.updateGrade(card_id, grade)
        .then(() => {
            dispatch(getCardsTC({cardsPack_id: cardsPack_ID}));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setAppIsLoadingAC(false));
        });
};

export const getRandomCardTC = (params: GetCardsQueryParams): AppThunkType => (dispatch, getState: () => RootState) => {

    const {cardAnswer, cardQuestion, sortCards} = getState().cardsList;
    const {page, pageCount} = getState().cardsList.cardsData
    const queryParams: GetCardsQueryParams = {cardAnswer, cardQuestion, sortCards, page, pageCount, ...params};

    dispatch(setAppIsLoadingAC(true));
    dispatch(setIsFetchingCards({value: true}));

    cardsAPI.getCards(queryParams).then((response) => {
        const randomCard = getCard(response.cards)
        dispatch(setRandomCard({randomCard: randomCard}))
    }).catch(error => {
        handleAppRequestError(error, dispatch);
    }).finally(() => {
        dispatch(setAppIsLoadingAC(false));
        dispatch(setIsFetchingCards({value: false}));
    })
};

export const gradeCardTC = (grade: number): AppThunkType => (dispatch, getState: () => AppStateType) => {
    const _id = getState().cardsList.randomCard._id
    dispatch(setLoadingModal({loadingModal: true}))
    cardsAPI.updateGrade(_id, grade).then((response) => {
        setChangeGradeCards(response.updatedGrade)
    }).catch(error => {
        handleAppRequestError(error, dispatch);
    }).finally(() => {
        dispatch(setLoadingModal({loadingModal: false}))
    })
}