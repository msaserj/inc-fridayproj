import {
    cardsAPI,
    GetCardsQueryParams,
    GetCardsResponseDataType,
    NewCardDataType,
    UpdateCardModelType, UpdatedGradeType
} from "./cards-api";
import {AppStateType, AppThunkType} from "../../App/store";
import {setAppIsLoadingAC} from "../../App/app-reducer";
import {handleAppRequestError} from "../../common/utils/error-utils";
import {getCard} from "../../common/constants/random";

export type CardsListActionsType =
    | ReturnType<typeof setCardsDataAC>
    | ReturnType<typeof setCurrentPageCardsListAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setIsFetchingCards>
    | ReturnType<typeof setSearchQueryByQuestionAC>
    | ReturnType<typeof setCardsSortDirectionAC>
    | ReturnType<typeof setPackNameAC>
    | ReturnType<typeof setRandomCard>
    | ReturnType<typeof setLoadingModal>
    | ReturnType<typeof setChangeGradeCards>;

// Initial state
type InitStateType = typeof initState;
export const stringInit = null as unknown as string
export const numberInit = null as unknown as number
const initState = {
    cards: [] as Array<any>,
    packUserId: undefined as undefined | string,
    cardsTotalCount: 0,
    maxGrade: undefined as undefined | number,
    minGrade: undefined as undefined | number,
    page: 1,
    pageCount: 10,
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
export const cardsListReducer = (state: InitStateType = initState, action: CardsListActionsType): InitStateType => {
    switch (action.type) {
        case "cardsList/SET_CARDS_DATA":
            return {...state, ...action.payload};
        case"cardsList/SET_CURRENT_PAGE":
            return {...state, page: action.page};
        case "cardsList/SET_PAGE_COUNT":
            return {...state, pageCount: action.pageCount};
        case "cardsList/SET_IS_FETCHING":
            return {...state, isFetchingCards: action.value};
        case "cardsList/SET_SEARCH_QUERY_BY_QUESTION":
            return {...state, cardQuestion: action.value};
        case "cardsList/SET_CARDS_SORT_DIRECTION":
            return {...state, sortCards: action.value};
        case "cardsList/SET_PACK_NAME":
            return {...state, packName: action.name};
        case "cardsList/SET-RANDOM-CARD":
            return {...state, randomCard: action.randomCard}
        case "cardsList/SET-LOADING-MODAL":
            return {...state, loadingModal: action.loadingModal}
        case "cardsList/SET-CHANGE-GRADE-CARDS":
            return {
                ...state, ...state.cards.map(el => el._id === action.card._id ? {
                    ...el,
                    grade: action.card.grade
                } : el)
            }
        default:
            return state;
    }
};

// Action creators
export const setCardsDataAC = (data: GetCardsResponseDataType) =>
    ({type: "cardsList/SET_CARDS_DATA", payload: data} as const);
export const setCurrentPageCardsListAC = (page: number) =>
    ({type: "cardsList/SET_CURRENT_PAGE", page} as const);
export const setPageCountAC = (pageCount: number) =>
    ({type: "cardsList/SET_PAGE_COUNT", pageCount} as const);
export const setSearchQueryByQuestionAC = (value: string) =>
    ({type: "cardsList/SET_SEARCH_QUERY_BY_QUESTION", value} as const);
export const setCardsSortDirectionAC = (value: string) =>
    ({type: "cardsList/SET_CARDS_SORT_DIRECTION", value} as const);
export const setIsFetchingCards = (value: boolean) =>
    ({type: "cardsList/SET_IS_FETCHING", value} as const);
export const setPackNameAC = (name: string) =>
    ({type: "cardsList/SET_PACK_NAME", name} as const);
export const setRandomCard = (randomCard: any) =>
    ({type: "cardsList/SET-RANDOM-CARD", randomCard} as const)
const setLoadingModal = (loadingModal: boolean) =>
    ({type: "cardsList/SET-LOADING-MODAL", loadingModal} as const)
const setChangeGradeCards = (card: UpdatedGradeType) =>
    ({type: "cardsList/SET-CHANGE-GRADE-CARDS", card} as const)


// Thunk creators
export const getCardsTC = (params: GetCardsQueryParams): AppThunkType => (dispatch, getState: () => AppStateType) => {

    const {cardAnswer, cardQuestion, sortCards, page, pageCount} = getState().cardsList;
    const queryParams: GetCardsQueryParams = {cardAnswer, cardQuestion, sortCards, page, pageCount, ...params,};

    dispatch(setAppIsLoadingAC(true));
    dispatch(setIsFetchingCards(true));
    cardsAPI.getCards(queryParams)
        .then(data => {
            dispatch(setCardsDataAC(data));
        })
        .catch(error => {
            handleAppRequestError(error, dispatch);
        })
        .finally(() => {
            dispatch(setAppIsLoadingAC(false));
            dispatch(setIsFetchingCards(false));
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
export const deleteCardTC = (cardsPack_ID: string, card_ID: string): AppThunkType => (dispatch, getState: () => AppStateType) => {
    const cardsArrLength = getState().cardsList.cards.length;
    let currentPage = getState().cardsList.page;

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

export const getRandomCardTC = (params: GetCardsQueryParams): AppThunkType => (dispatch, getState: () => AppStateType) => {

    const {
        cardAnswer,
        cardQuestion,
        sortCards,
        page,
        pageCount,
    } = getState().cardsList;

    const queryParams: GetCardsQueryParams = {
        cardAnswer,
        cardQuestion,
        sortCards,
        page,
        pageCount,
        ...params,
    };

    dispatch(setAppIsLoadingAC(true));
    dispatch(setIsFetchingCards(true));

    cardsAPI.getCards(queryParams).then((response) => {
        const randomCard = getCard(response.cards)
        dispatch(setRandomCard(randomCard))
    }).catch(error => {
        handleAppRequestError(error, dispatch);
    }).finally(() => {
        dispatch(setAppIsLoadingAC(false));
        dispatch(setIsFetchingCards(false));
    })
};

export const gradeCardTC = (grade: number): AppThunkType => (dispatch, getState: () => AppStateType) => {
    const _id = getState().cardsList.randomCard._id
    dispatch(setLoadingModal(true))
    cardsAPI.updateGrade(_id, grade).then((response) => {
        setChangeGradeCards(response.updatedGrade)
    }).catch(error => {
        handleAppRequestError(error, dispatch);
    }).finally(() => {
        dispatch(setLoadingModal(false))
    })

}


// export const sortCardsThunk = (sortCards: string): AppThunkType => (dispatch, getState: () => AppStateType) => {
// 	const {
// 		cardAnswer,
// 		cardQuestion,
// 		sortCards,
// 		page,
// 		pageCount,
// 		packName
// 	} = getState().cardsList;
//
//
//
// 	// const queryParams: GetCardsQueryParams = {
// 	// 	cardAnswer,
// 	// 	cardQuestion,
// 	// 	sortCards,
// 	// 	page,
// 	// 	pageCount,
// 	// 	...params,
// 	// };
// 	console.log(packName)
// 	dispatch(setAppIsLoadingAC(true));
// 	dispatch(setIsFetchingCards(true));
// 	// cardsAPI.getCards(queryParams)
// 	 cardsAPI.getCards({ cardAnswer,
// 		 	cardQuestion,
// 		 	sortCards,
// 		 	page,
// 		 	pageCount
// 		 	})
// 		.then(data => {
// 			dispatch(setCardsDataAC(data));
// 		})
// 		.catch(error => {
// 			handleAppRequestError(error, dispatch);
// 		})
// 		.finally(() => {
// 			dispatch(setAppIsLoadingAC(false));
// 			dispatch(setIsFetchingCards(false));
// 		});
// };

//
// export const sortCardsThunk = (sortCards: string): AppThunkType => (
// 	dispatch, getState) => {
// 	const queryParams: GetCardsQueryParams = {
// 		cardAnswer,
// 		cardQuestion,
// 		sortCards,
// 		page,
// 		pageCount,
// 		...params,
// 	};
// 	const {pageCount, } = getState().cardsList;
// 	const packName = searchResult ? searchResult : '';
// 	const {_id} = getState().auth.user;
// 	const user_id = isMyPacks ? _id : '';
// 	dispatch(setAppIsLoadingAC(true));
// 	dispatch(setCurrentFilterAC(sortPacks));
//
//
// 	cardsAPI.getCards({pageCount, sortPacks, user_id, packName})
// 		.then(res => {
// 			dispatch(getCardsPackAC(res.cardPacks));
// 			dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
// 		})
// 		.catch(error => handleAppRequestError(error, dispatch))
// 		.finally(() => dispatch(setAppIsLoadingAC(false)));
// };
