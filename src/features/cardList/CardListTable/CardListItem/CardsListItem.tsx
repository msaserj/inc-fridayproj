import {CardType} from "../../cards-api";
import {useAppSelector} from "../../../../common/hooks/hooks";
import React, {FC} from "react";
import {BeautyDate} from "../../../../common/utils/BeautyDate/BeautyDate";
import {SuperSmallButton} from "../../../../common/components/Primitive/SmallButtons/SuperSmallButton/SuperSmallButton";
import {SuperStarRating} from "../../../../common/components/Primitive/StarRating/SuperStarsRating";

type CardsListItemPropsType = {
	card: CardType
	editCardHandler: (_id:string, question:string, answer:string) => void
	deleteCardHandler: (cardsPack_id: string, _id: string, question: string) => void
};

export const CardsListItem: FC<CardsListItemPropsType> = ({card, editCardHandler, deleteCardHandler }) => {
	const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);
	const userId = useAppSelector<string>(state => state.auth.user._id);

	return (
		<>
			<tr>
				<td>{card.question}</td>
				<td>{card.answer}</td>
				<td><BeautyDate date={card.updated}/></td>
				<td><SuperStarRating initialRating={Math.round(card.grade * 10) / 10}/></td>
				{card.user_id === userId &&
                    <td>
                        <SuperSmallButton edit onClick={()=>editCardHandler(card._id, card.question, card.answer)}
                                          disabled={isFetchingCards}/>
                        <SuperSmallButton delet onClick={()=>deleteCardHandler(card.cardsPack_id, card._id, card.question)} disabled={isFetchingCards}/>
                    </td>
				}
			</tr>
		</>
	);
};
