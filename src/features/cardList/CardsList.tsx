import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {
    getCardsTC,
    setSearchQueryByQuestionAC,
} from "./cardList-reducer";
import {PATH} from "../../common/constants/Path";
import css from './CardsList.module.css';
import {DebounceSearch} from "../../common/utils/DebounceSearch/DebounceSearch";
import {DotedLoader} from "../../common/components/Primitive/c8-Loaders/DotedLoader/DotedLoader";
import {BackToPackList} from "../../common/components/BackToPackList/BackToPackList";
import SuperButton from "../../common/components/Primitive/c2-Button/SuperButton";
import {AddNewCardModal} from "./AddNewCardModal/AddNewCardModal";
import {CardListTable} from "./CardListTable/CardListTable";
import {getUserId} from "../auth/profile/profileSelectors";
import {
    getCardQuestion,
    getCards,
    getCurrentFilter, getCurrentPage,
    getIsFetchingCards,
    getPackName,
    getPackUserId
} from "./cardsSelectors";


export const CardsList = () => {
    const urlParams = useParams<'cardPackID'>();
    const cardsPack_ID = urlParams.cardPackID;

    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(getUserId);
    const cards = useAppSelector(getCards);
    const isFetchingCards = useAppSelector(getIsFetchingCards);
    const packName = useAppSelector(getPackName)
    const packUserId = useAppSelector(getPackUserId);
    const cardQuestion = useAppSelector(getCardQuestion);
    const currentFilter = useAppSelector(getCurrentFilter);
    const currentPage = useAppSelector(getCurrentPage);

    const [activeModalPack, setModalActivePack] = useState<boolean>(false)
    const modalCloseHandler = () => setModalActivePack(false);
    const addCardsPackHandler = () => setModalActivePack(true)


    useEffect(() => {
        // cardsPack_ID достаем из useParams, что бы знать в каком паке ищутся карточки
        if (cardsPack_ID) {
            dispatch(getCardsTC({cardsPack_id: cardsPack_ID}));
        }
    }, [dispatch, cardsPack_ID, currentFilter, cardQuestion, currentPage]);

    const searchCardsByQuestion = (value: string) => {
        dispatch(setSearchQueryByQuestionAC({value}));
    };
    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={css.cardsPage}>
            <BackToPackList/>
            <div className={css.headPackName}><h3>Name Pack: {packName}</h3></div>
            <div className={css.searchBlock}>
                <div>
                    <DebounceSearch
                        resetValue={cardQuestion}
                        setSearchValue={searchCardsByQuestion}
                        placeholder={"Search by question..."}
                    />
                </div>
                <div>
                    <SuperButton onClick={addCardsPackHandler} disabled={isFetchingCards || isLoggedIn !== packUserId}>
                        Add card
                    </SuperButton>
                </div>
            </div>
            {isFetchingCards ? <DotedLoader/> : cards.length === 0 ?
                    <div>No cards found. Press "Add card" to create new card in this pack</div>
                    : <CardListTable idPack={cardsPack_ID}/>}
            <AddNewCardModal handleClose={modalCloseHandler} open={activeModalPack}/>

        </div>
    );
};