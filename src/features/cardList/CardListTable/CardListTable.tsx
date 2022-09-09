import React, {FC, useState} from 'react';
import css from "./CardListTable.module.css";
import {CardsListItem} from "./CardListItem/CardsListItem";
import {Paginator} from "../../../common/components/Paginator/Paginator";
import {setCardsSortDirectionAC, setCurrentPageCardsListAC} from "../cardList-reducer";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";

import {CardType} from "../cards-api";
import {SuperSmallButton} from "../../../common/components/SmallButtons/SuperSmallButton/SuperSmallButton";
import {AddNewCardModal} from "../AddNewCardModal/AddNewCardModal";
import {DeleteCardModal} from "../DeleteCardModal/DeleteCardModal";

export type CardListPropsType = {
    idPack: string | undefined
}

export const CardListTable: FC<CardListPropsType> = ( idPack) => {

    const dispatch = useAppDispatch();

    const sortCards = useAppSelector<string>(state => state.cardsList.sortCards);
    const currentPage = useAppSelector<number>(state => state.cardsList.page);
    const pageSize = useAppSelector<number>(store => store.cardsList.pageCount);
    const cardsTotalCount = useAppSelector<number>(state => state.cardsList.cardsTotalCount);
    const user_ID = useAppSelector(state => state.auth.user._id);
    const cards = useAppSelector<Array<CardType>>(state => state.cardsList.cards);
    const packUser_ID = useAppSelector(state => state.cardsList.packUserId);
    const card = cards.find((t)=>{
        return t._id === idPack.idPack
    })

    const [activeModalPack, setModalActivePack] = useState<boolean>(false)
    // const modalCloseHandler = () => setModalActivePack(false);

    const [id, setId] = useState<string>('');
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const [activeDeleteModalPack, setActiveDeleteModalPack] = useState<boolean>(false)

    const modalCloseHandler = () => {
        setModalActivePack(false);
        setActiveDeleteModalPack(false);
    }
    const setQuestion_Answer = (id: string, question: string, answer:string ) => {
        setId(id)
        setQuestion(question)
        setAnswer(answer)
    }

    const setOpenEditModal = (id: string, question: string, answer:string) => {
        setModalActivePack(true)
        setQuestion_Answer(id , question, answer)
    }
    const setOpenDeleteModal = (cardsPack_id: string, id: string, question: string) => {
        setActiveDeleteModalPack(true)
        setQuestion(question)
        setId(id)
    }

    const changePageHandler = (page: number) => {
        dispatch(setCurrentPageCardsListAC(page));
    };
    //	фильтрация карт по типу (тип передаем в виде строки)
    const changeCardsSortDirection = (sortType: string) => {
        if (sortCards === "0" + sortType) {
            dispatch(setCardsSortDirectionAC(`1${sortType}`));
        } else {
            dispatch(setCardsSortDirectionAC(`0${sortType}`));
        }
    };
    return (
        <div>
            <div className={css.tableMainBlock}>
                <table>
                    <thead className={css.theadStyle}>
                    <tr className={css.trStyle}>
                        <th className={css.sortBlock} onClick={() =>changeCardsSortDirection("question")} >
                            <span>Question</span>
                            <SuperSmallButton style={{padding: "2px 8px"}} arrowUp={sortCards === "1question"} />
                        </th>
                        <th className={css.sortBlock} onClick={() => changeCardsSortDirection("answer")}>
                            <span>Answer</span>
                            <SuperSmallButton style={{padding: "2px 8px"}} arrowUp={sortCards === "1answer"} />
                        </th>
                        <th className={css.sortBlock} onClick={() => changeCardsSortDirection("updated")}>
                            <span>Last Updated</span>
                            <SuperSmallButton style={{padding: "2px 8px"}} arrowUp={sortCards === "1updated"} />
                        </th>
                        <th className={css.sortBlock} onClick={() => changeCardsSortDirection("grade")}>
                            <span>Grade</span>
                            <SuperSmallButton style={{padding: "2px 8px"}} arrowUp={sortCards === "1grade"} />
                        </th>
                        {user_ID === packUser_ID && <th>Actions</th>}
                    </tr>
                    </thead>

                    <tbody className={css.tbodyStyle}>
                    {cards.map(c => {
                        return (
                            <CardsListItem
                                key={c._id}
                                card={c}
                                editCardHandler={setOpenEditModal}
                                deleteCardHandler={setOpenDeleteModal}/>
                        );
                    })}
                    </tbody>
                </table>

                <div className={css.paginator}>
                    <Paginator
                        siblingCount={3}
                        totalCount={cardsTotalCount}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={changePageHandler}
                    />
                </div>
            </div>

            <AddNewCardModal handleClose={modalCloseHandler} open={activeModalPack}
                             answer={answer} question={question} id={id}/>

            <DeleteCardModal open={activeDeleteModalPack}
                             handleClose={modalCloseHandler}
                             idPack={idPack}
                             idCard={id}
                             cardQuestion={question}/>

        </div>
    );
};
