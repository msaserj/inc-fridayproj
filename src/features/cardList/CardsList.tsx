import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {CardType, NewCardDataType} from "./cards-api";
import {
	addNewCardTC,
	getCardsTC,
	setCardsSortDirectionAC, setCurrentPageCardsListAC,
	setSearchQueryByAnswerAC,
	setSearchQueryByQuestionAC
} from "./cardList-reducer";
import {SortButton} from "../../common/components/SortButton/SortButton";
import {Paginator} from "../packList/Paginator/Paginator";
import {Button} from "@mui/material";
import {PATH} from "../../common/constants/Path";
import s from './CardsList.module.css';
import {DebounceSearchCards} from "./DebounceSearchCards/DebounceSearchCards";
import {DotedLoader} from "../../common/components/c8-Loaders/DotedLoader/DotedLoader";
import {CardsListItem} from "./CardsListItem";
import {log} from "util";


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
	const navigate = useNavigate();

	useEffect(() => {
		if (cardsPack_ID) {
			console.log('cardsPack_ID:', cardsPack_ID)
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

	const backButtonHandler = () => {
		navigate(PATH.PACK_LIST);
	};

	if (!user_ID) {
		return <Navigate to={PATH.LOGIN}/>
	}

	return (
		<div className={s.cardsPage}>
			<div>
				<Button onClick={backButtonHandler}>
					&#10094; Back to Packs List
				</Button>
			</div>
			<div>
				<DebounceSearchCards
					searchValue={cardQuestion}
					setSearchValue={searchCardsByQuestion}
					placeholder={"Search by question..."}
					disabled={isFetchingCards}
				/>

				{user_ID === packUser_ID &&
                    <Button onClick={() => console.log()} disabled={isFetchingCards}>Add card</Button>
				}
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