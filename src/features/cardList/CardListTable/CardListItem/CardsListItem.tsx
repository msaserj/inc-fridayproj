import {CardType} from "../../cards-api";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {deleteCardTC} from "../../cardList-reducer";
import React, {FC} from "react";
import {BeautyDate} from "../../../../common/components/BeautyDate/BeautyDate";
import {SuperSmallButton} from "../../../../common/components/SmallButtons/SuperSmallButton/SuperSmallButton";
import {SuperStarRating} from "../../../../common/components/StarRating/SuperStarsRating";

type CardsListItemPropsType = {
	card: CardType
	editCardHandler: (_id:string, question:string, answer:string) => void
};

export const CardsListItem: FC<CardsListItemPropsType> = ({card, editCardHandler }) => {
	const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);
	const userId = useAppSelector<string>(state => state.auth.user._id);
	const dispatch = useAppDispatch();

	const deleteButtonHandler = () => {
		dispatch(deleteCardTC(card.cardsPack_id, card._id));
	};

	// const setStars = (stars: any) => {
	// 	dispatch(updateCardGradeTC(card.cardsPack_id, card._id, stars))
	// }

	return (
		<>
			<tr>
				<td>{card.question}</td>
				<td>{card.answer}</td>
				<td><BeautyDate date={card.updated}/></td>

				{/*<td><SuperStarRating initialRating={Math.round(card.grade * 10) / 10} onRate={setStars}/></td>*/}
				<td><SuperStarRating initialRating={Math.round(card.grade * 10) / 10}/></td>

				{card.user_id === userId &&
                    <td>
                        <SuperSmallButton edit onClick={()=>editCardHandler(card._id, card.question, card.answer)}
                                          disabled={isFetchingCards}/>
                        <SuperSmallButton delet onClick={deleteButtonHandler} disabled={isFetchingCards}/>
                    </td>
				}
			</tr>
		</>
	);
};
