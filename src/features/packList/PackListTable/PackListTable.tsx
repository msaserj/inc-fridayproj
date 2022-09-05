import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {deleteCardsPackThunk} from "../packList-reducer";
import {PacksType} from "../packCards-api";
import s from './PackListTable.module.css'
import {TableHeaders} from "./TableHeaders/TableHeaders";
import {PATH} from "../../../common/constants/Path";
import {BeautyDate} from "../../../common/components/BeautyDate/BeautyDate";
import SuperButton from "../../../common/components/c2-Button/SuperButton";
import deleteIcon from "../../../assets/img/delete.svg";
import teacher from "../../../assets/img/teacher.svg";
import pencil from "../../../assets/img/pencil.svg";
import {EditPackName} from "../EditPackNamr/EditPackName";
import React, {useState} from "react";
import {DotedLoader} from "../../../common/components/c8-Loaders/DotedLoader/DotedLoader";


export const PacksListTable = () => {
    const isFetching = useAppSelector<boolean>(state => state.app.appIsLoading)
    const dispatch = useAppDispatch();
    const userId = useAppSelector<string>(state => state.auth.user._id);
    const cardPacks = useAppSelector<PacksType[]>(store => store.packsList.cardPacks);

    const [activeModalPack, setModalActivePack] = useState<boolean>(false)
    const [id, setId] = useState<string>('');
    const [packName, setPackName] = useState<string>('+++++')

    const modalCloseHandler = () => setModalActivePack(false);

    const editHandler = (id: string, name: string) => {
        setId(id)
        setPackName(name);
        setModalActivePack(true)
    }

    const deletePackCardsHandler = (id: string) => {
        dispatch(deleteCardsPackThunk(id))
    }
    const learnHandler = (id: string, name: string) => {
        alert("You press learn button  " + name)
    }
    return (
        isFetching ?
            <div><DotedLoader large/></div> :
            <div className={s.tableMainBlock}>
                <table>
                    <TableHeaders/>
                    <tbody className={s.tbodyStyle}>
                    {cardPacks.map((el) => {
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
                                        <SuperButton style={{backgroundColor: "white"}} disabled={isFetching}
                                                     onClick={() => learnHandler(el._id, el.name)}
                                        ><img src={teacher} alt="teacherIco"/></SuperButton>
                                        {el.user_id === userId &&
                                            <SuperButton style={{backgroundColor: "white"}} disabled={isFetching}
                                                         onClick={() => editHandler(el._id, el.name)}
                                            ><img alt="editIco" src={pencil}/></SuperButton>}
                                        {el.user_id === userId &&
                                            <SuperButton style={{backgroundColor: "white"}} disabled={isFetching}
                                                         onClick={() => deletePackCardsHandler(el._id)}
                                            ><img alt="deleteIco" src={deleteIcon}/></SuperButton>}
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
                <EditPackName open={activeModalPack}
                              handleClose={modalCloseHandler}
                              idCard={id}
                              packNameFromPackListTable={packName}
                />
            </div>
    );
};
