import {CardType, UpdateCardModelType} from "./cards-api";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {deleteCardTC, updateCardGradeTC, updateCardTC} from "./cardList-reducer";
import {FC, useState} from "react";
import {BeautyDate} from "../../common/components/BeautyDate/BeautyDate";
import {SuperSmallButton} from "../../common/components/SmallButtons/SuperSmallButton/SuperSmallButton";
import {SuperStarRating} from "../../common/components/StarRating/SuperStarsRating";

type CardsListItemPropsType = {
	card: CardType
};

export const CardsListItem: FC<CardsListItemPropsType> = ({card}) => {
	const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);
	const userId = useAppSelector<string>(state => state.auth.user._id);
	const dispatch = useAppDispatch();


	const question = "6*6"
	const answer = "36"

	const editCardHandler = () => {
		const cardUpdateModel: UpdateCardModelType = {
			_id: card._id,
			question: question,
			answer: answer,
		};
		dispatch(updateCardTC(card.cardsPack_id, cardUpdateModel));
	};

	const deleteButtonHandler = () => {
		dispatch(deleteCardTC(card.cardsPack_id, card._id));
	};
	const [state, setState] = useState(0)
	console.log("Star State22", state)
	const setStars = (stars: any) => {
		setState(stars)
		dispatch(updateCardGradeTC(card.cardsPack_id, card._id, stars))
	}

	return (
		<>
			<tr>
				<td>{card.question}</td>
				<td>{card.answer}</td>
				<td><BeautyDate date={card.updated}/></td>

				<td><SuperStarRating initialRating={Math.round(card.grade * 10) / 10}   onRate={setStars}/></td>
				{card.user_id === userId &&
                    <td>
                        <SuperSmallButton edit onClick={editCardHandler} disabled={isFetchingCards}/>
                        <SuperSmallButton delet onClick={deleteButtonHandler} disabled={isFetchingCards}/>
                    </td>
				}
			</tr>
		</>
	);
};
