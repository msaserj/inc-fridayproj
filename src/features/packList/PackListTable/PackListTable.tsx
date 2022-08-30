import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {deleteCardsPackThunk, setSearchResultAC, updateCardsPackThunk} from "../packList-reducer";
import {Button} from "@mui/material";
import {useState} from "react";
import {PacksType} from "../packCards-api";
import s from './PackListTable.module.css'
import {TableHeaders} from "./TableHeaders/TableHeaders";
import {PATH} from "../../../common/constants/Path";
import {BeautyDate} from "../../../common/components/BeautyDate/BeautyDate";
import SuperButton from "../../../common/components/c2-Button/SuperButton";


type PacksListTableType = {
	name: string
	onFocusHandler: () => void
	setName: (value: string) => void
}

export const PacksListTable: React.FC<PacksListTableType> = (
	{
		name,
		onFocusHandler,
		setName,
	}
) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [id, setId] = useState<string>('');
	const [makePrivate, setMakePrivate] = useState(false);

	const userId = useAppSelector<string>(state => state.auth.user._id);
	const dataPack = useAppSelector<PacksType[]>(store => store.packsList.cardPacks);

	//ф-ия вызова модального окна при изменении имени колоды
	const editHandler = (id: string, name: string) => {
		dispatch(setSearchResultAC(''));
		setName(name);
		setId(id);
	}
	//ф-ия вызова модального окна при удалении колоды
	const deletePackCardsHandler = (id: string, name: string) => {
		dispatch(setSearchResultAC(''));
		setId(id);
		setName(name);
	}
	const learnHandler = (id: string, name: string) => {
	}
	//ф-ия изменения имени колоды и закрытия окна
	const changeName = () => {
		dispatch(updateCardsPackThunk(id, name, makePrivate))
	}
	//ф-ия удаления колоды и закрытия окна
	const deletePack = () => {
		dispatch(deleteCardsPackThunk(id))
	}

	return (
		<div className={s.tableMainBlock}>
			{
				<table>
					<TableHeaders/>
					<tbody className={s.tbodyStyle}>
					{dataPack.map((el, index) => {
						return (
							<tr key={el._id}>

								<td className={s.nameStyle}>
									<NavLink to={PATH.CARDS_LIST + el._id}>
										{el.name}
									</NavLink>
								</td>
								<td>{el.cardsCount}</td>
								<td><BeautyDate date={el.updated}/></td>
								<td>{el.user_name}</td>
								<td className={s.actions}>
									<div className={s.buttonBlock}>
										<Button onClick={() => learnHandler(el._id, el.name)}
										>Learn</Button>
										{el.user_id === userId &&
                                            <Button onClick={() => editHandler(el._id, el.name)}
                                            >Edit</Button>}
										{el.user_id === userId &&
                                            <SuperButton onClick={() => deletePackCardsHandler(el._id, el.name)}
                                                    red>Delete</SuperButton>}
									</div>
								</td>
							</tr>
						)
					})}
					</tbody>
				</table>
			}
		</div>
	);
};
