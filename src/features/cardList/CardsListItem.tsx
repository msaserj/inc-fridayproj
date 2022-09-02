import {CardType, UpdateCardModelType} from "./cards-api";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {deleteCardTC, updateCardTC} from "./cardList-reducer";
import {FC} from "react";
import {BeautyDate} from "../../common/components/BeautyDate/BeautyDate";
import SuperButton from "../../common/components/c2-Button/SuperButton";
import pencil from "../../assets/img/pencil.svg";
import deleteIcon from "../../assets/img/delete.svg";

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

	return (
		<>
			<tr>
				<td>{card.question}</td>
				<td>{card.answer}</td>
				<td><BeautyDate date={card.updated}/></td>
				<td>{Math.round(card.grade * 100) / 100}</td>
				{card.user_id === userId &&
                    <td>
                        <SuperButton style={{backgroundColor: "white"}} onClick={editCardHandler} disabled={isFetchingCards}>
							<img alt="editIco" src={pencil}/></SuperButton>
                        <SuperButton style={{backgroundColor: "white"}} onClick={deleteButtonHandler} disabled={isFetchingCards}>
							<img alt="deleteIco" src={deleteIcon}/></SuperButton>
                    </td>
				}
			</tr>
		</>
	);
};
