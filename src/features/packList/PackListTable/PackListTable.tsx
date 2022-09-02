import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {deleteCardsPackThunk, updateCardsPackThunk} from "../packList-reducer";

import {PacksType} from "../packCards-api";
import s from './PackListTable.module.css'
import {TableHeaders} from "./TableHeaders/TableHeaders";
import {PATH} from "../../../common/constants/Path";
import {BeautyDate} from "../../../common/components/BeautyDate/BeautyDate";
import SuperButton from "../../../common/components/c2-Button/SuperButton";
import deleteIcon from "../../../assets/img/delete.svg";
import teacher from "../../../assets/img/teacher.svg";
import pencil from "../../../assets/img/pencil.svg";


export const PacksListTable = () => {
    const isLoading = useAppSelector<boolean>(state => state.app.appIsLoading)
    const dispatch = useAppDispatch();
    const userId = useAppSelector<string>(state => state.auth.user._id);
    const cardPacks = useAppSelector<PacksType[]>(store => store.packsList.cardPacks);
    const packName = "newNameEdited"

    const editHandler = (id: string, packName: string) => {
        dispatch(updateCardsPackThunk(id, packName))

    }
    const deletePackCardsHandler = (id: string) => {
        dispatch(deleteCardsPackThunk(id))
    }
    const learnHandler = (id: string, name: string) => {
        alert("You press learn button  " + name)
    }
    return (
        <div className={s.tableMainBlock}>
            {
                <table>
                    <TableHeaders/>
                    <tbody className={s.tbodyStyle}>
                    {cardPacks.map((el, index) => {
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
                                        <SuperButton style={{backgroundColor: "white"}} disabled={isLoading} onClick={() => learnHandler(el._id, el.name)}
                                        ><img src={teacher} alt="teacherIco"/></SuperButton>
                                        {el.user_id === userId &&
                                            <SuperButton style={{backgroundColor: "white"}} disabled={isLoading} onClick={() => editHandler(el._id, packName)}
                                            ><img alt="editIco" src={pencil}/></SuperButton>}
                                        {el.user_id === userId &&
                                            <SuperButton style={{backgroundColor: "white"}} disabled={isLoading} onClick={() => deletePackCardsHandler(el._id)}
                                                         ><img alt="deleteIco" src={deleteIcon}/></SuperButton>}
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
