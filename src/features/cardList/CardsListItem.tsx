import {CardType, UpdateCardModelType} from "./cards-api";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {deleteCardTC, updateCardTC} from "./cardList-reducer";
import {FC, useState} from "react";
import {BeautyDate} from "../../common/components/BeautyDate/BeautyDate";
import SuperButton from "../../common/components/c2-Button/SuperButton";

type CardsListItemPropsType = {
	card: CardType
};

export const CardsListItem: FC<CardsListItemPropsType> = ({card}) => {
	const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);
	const userId = useAppSelector<string>(state => state.auth.user._id);
	const dispatch = useAppDispatch();

	const [activeDeleteModal, setActiveDeleteModal] = useState(false);
	const [activeModal, setActiveModal] = useState<boolean>(false);
	const [answer, setAnswer] = useState<string>(card.answer);
	const [question, setQuestion] = useState<string>(card.question);

	const editCardHandler = () => {
		const cardUpdateModel: UpdateCardModelType = {
			_id: card._id,
			question: question,
			answer: answer,
		};
		dispatch(updateCardTC(card.cardsPack_id, cardUpdateModel));
	};
	const deleteCardHandler = () => {
		dispatch(deleteCardTC(card.cardsPack_id, card._id));
		setActiveDeleteModal(false);
	};
	const deleteButtonHandler = () => {
		setActiveDeleteModal(true);
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
                        <SuperButton onClick={() => setActiveModal(true)} disabled={isFetchingCards}>Edit</SuperButton>
                        <SuperButton onClick={deleteButtonHandler} disabled={isFetchingCards} red>Delete</SuperButton>

                    </td>
				}
			</tr>
		</>
	);
};
