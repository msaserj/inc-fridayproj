import React, {useEffect} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {CardType} from "./cards-api";
import {
    addNewCardTC,
    getCardsTC,
    setCardsSortDirectionAC,
    setCurrentPageCardsListAC,
    setSearchQueryByQuestionAC
} from "./cardList-reducer";
import {SortButton} from "../../common/components/SortButton/SortButton";
import {Paginator} from "../packList/Paginator/Paginator";

import {PATH} from "../../common/constants/Path";
import s from './CardsList.module.css';
import {DebounceSearchCards} from "./DebounceSearchCards/DebounceSearchCards";
import {DotedLoader} from "../../common/components/c8-Loaders/DotedLoader/DotedLoader";
import {CardsListItem} from "./CardsListItem";

import {BackToPackList} from "../../common/components/BackToPackList/BackToPackList";
import SuperButton from "../../common/components/c2-Button/SuperButton";


export const CardsList = () => {
    const urlParams = useParams<'cardPackID'>();
    const cardsPack_ID = urlParams.cardPackID;

    const user_ID = useAppSelector(state => state.auth.user._id);
    const packUser_ID = useAppSelector(state => state.cardsList.packUserId);
    const cards = useAppSelector<Array<CardType>>(state => state.cardsList.cards);
    const cardsTotalCount = useAppSelector<number>(state => state.cardsList.cardsTotalCount);
    const pageSize = useAppSelector<number>(store => store.cardsList.pageCount);
    const currentPage = useAppSelector<number>(state => state.cardsList.page);
    const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);
    const cardQuestion = useAppSelector<string>(state => state.cardsList.cardQuestion);
    const sortCards = useAppSelector<string>(state => state.cardsList.sortCards);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (cardsPack_ID) {
            dispatch(getCardsTC({cardsPack_id: cardsPack_ID}));
        }
    }, [cardsPack_ID]);

    const changePageHandler = (page: number) => {
        dispatch(setCurrentPageCardsListAC(page));
    };
    const searchCardsByQuestion = (value: string) => {
        dispatch(setSearchQueryByQuestionAC(value));
    };

    const changeCardsSortDirection = (sortType: string) => {
        if (sortCards === "0" + sortType) {
            dispatch(setCardsSortDirectionAC(`1${sortType}`));
        } else {
            dispatch(setCardsSortDirectionAC(`0${sortType}`));
        }
    };
    const addCardHandler = () => {
        if (cardsPack_ID) {
            dispatch(addNewCardTC({question: "5*5", answer: "25", cardsPack_id: cardsPack_ID}));
        }
    };
    if (!user_ID) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={s.cardsPage}>
            <BackToPackList/>
            <div className={s.searchBlock}>
                <div>
                    <DebounceSearchCards
                        searchValue={cardQuestion}
                        setSearchValue={searchCardsByQuestion}
                        placeholder={"Search by question..."}
                        disabled={isFetchingCards}
                    />
                </div>
                <div>
                    <SuperButton onClick={addCardHandler} disabled={isFetchingCards}>Add card</SuperButton>
                </div>

            </div>

            {isFetchingCards ?
                <DotedLoader/>
                :
                cards.length === 0 ?
                    <div>No cards found. Press "Add card" to create new card in this pack</div>
                    :
                    <div className={s.tableMainBlock}>
                        <table>
                            <thead className={s.theadStyle}>
                            <tr className={s.trStyle}>
                                <th className={s.sortBlock} onClick={() => changeCardsSortDirection("question")}>
                  <span>
                    Question
                  </span>
                                    <SortButton
                                        isActive={sortCards.slice(1) === "question"}
                                        direction={sortCards && sortCards[0]}
                                        isFetching={isFetchingCards}
                                    />
                                </th>
                                <th className={s.sortBlock} onClick={() => changeCardsSortDirection("answer")}>
                  <span>
                    Answer
                  </span>
                                    <SortButton
                                        isActive={sortCards.slice(1) === "answer"}
                                        direction={sortCards && sortCards[0]}
                                        isFetching={isFetchingCards}
                                    />
                                </th>
                                <th className={s.sortBlock} onClick={() => changeCardsSortDirection("updated")}>
                  <span>
                    Last Updated
                  </span>
                                    <SortButton
                                        isActive={sortCards.slice(1) === "updated"}
                                        direction={sortCards && sortCards[0]}
                                        isFetching={isFetchingCards}
                                    />
                                </th>
                                <th className={s.sortBlock} onClick={() => changeCardsSortDirection("grade")}>
                  <span>
                    Grade
                  </span>
                                    <SortButton
                                        isActive={sortCards.slice(1) === "grade"}
                                        direction={sortCards && sortCards[0]}
                                        isFetching={isFetchingCards}
                                    />
                                </th>
                                {user_ID === packUser_ID && <th>Actions</th>}
                            </tr>
                            </thead>
                            <tbody className={s.tbodyStyle}>
                            {cards.map(c => {
                                return (
                                    <CardsListItem key={c._id} card={c}/>
                                );
                            })}
                            </tbody>
                        </table>
                        <div className={s.paginator}>
                            <Paginator
                                siblingCount={3}
                                totalCount={cardsTotalCount}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                onPageChange={changePageHandler}
                            />
                        </div>
                    </div>
            }
        </div>
    );
};
