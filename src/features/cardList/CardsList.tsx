import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {CardType} from "./cards-api";
import {
    getCardsTC,
    setSearchQueryByQuestionAC,
} from "./cardList-reducer";
import {PATH} from "../../common/constants/Path";
import s from './CardsList.module.css';
import {DebounceSearch} from "../../common/components/DebounceSearch/DebounceSearch";
import {DotedLoader} from "../../common/components/c8-Loaders/DotedLoader/DotedLoader";
import {BackToPackList} from "../../common/components/BackToPackList/BackToPackList";
import SuperButton from "../../common/components/c2-Button/SuperButton";
import {AddNewCardModal} from "./AddNewCardModal/AddNewCardModal";
import {CardListTable} from "./CardListTable/CardListTable";


export const CardsList = () => {
    const urlParams = useParams<'cardPackID'>();
    const cardsPack_ID = urlParams.cardPackID;

    const dispatch = useAppDispatch();

    const user_ID = useAppSelector(state => state.auth.user._id);
    const cards = useAppSelector<Array<CardType>>(state => state.cardsList.cards);
    const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);
    const packName = useAppSelector(state => state.cardsList.packName)
    const packUser_ID = useAppSelector(state => state.cardsList.packUserId);
    const [activeModalPack, setModalActivePack] = useState<boolean>(false)
    const modalCloseHandler = () => setModalActivePack(false);
    const addCardsPackHandler = () => setModalActivePack(true)
    const cardQuestion = useAppSelector<string>(state => state.cardsList.cardQuestion);
    const currentFilter = useAppSelector<string>(state => state.cardsList.sortCards);
    const currentPage = useAppSelector<number>(state => state.cardsList.page);

    useEffect(() => {
        // cardsPack_ID достаем из useParams, что бы знать в каком паке ищутся карточки
        if (cardsPack_ID) {
            dispatch(getCardsTC({cardsPack_id: cardsPack_ID}));
        }
    }, [dispatch, cardsPack_ID, currentFilter, cardQuestion, currentPage]);

    const searchCardsByQuestion = (value: string) => {
        dispatch(setSearchQueryByQuestionAC(value));
    };
    if (!user_ID) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={s.cardsPage}>
            <BackToPackList/>
            <div className={s.headPackName}><h3>Name Pack: {packName}</h3></div>
            <div className={s.searchBlock}>
                <div>
                    <DebounceSearch
                        resetValue={cardQuestion}
                        setSearchValue={searchCardsByQuestion}
                        placeholder={"Search by question..."}
                    />
                </div>
                <div>
                    <SuperButton onClick={addCardsPackHandler} disabled={isFetchingCards || user_ID !== packUser_ID}>
                        Add card
                    </SuperButton>
                </div>
            </div>
            {isFetchingCards ? <DotedLoader/> : cards.length === 0 ?
                    <div>No cards found. Press "Add card" to create new card in this pack</div>
                    : <CardListTable/>}
            <AddNewCardModal handleClose={modalCloseHandler} open={activeModalPack}/>

        </div>
    );
};
