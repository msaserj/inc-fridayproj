import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../common/hooks/hooks";
import {PacksType} from "../packCards-api";
import s from './PackListTable.module.css'
import {TableHeaders} from "./TableHeaders/TableHeaders";
import {PATH} from "../../../common/constants/Path";
import {BeautyDate} from "../../../common/components/BeautyDate/BeautyDate";
import {EditPackName} from "../EditPackNameModal/EditPackName";
import React, {useState} from "react";
import {DotedLoader} from "../../../common/components/c8-Loaders/DotedLoader/DotedLoader";
import {SuperSmallButton} from "../../../common/components/SmallButtons/SuperSmallButton/SuperSmallButton";
import {DeletePackModal} from "../DeletePackModal/DeletePackModal";


export const PacksListTable = () => {
    const isFetching = useAppSelector<boolean>(state => state.app.appIsLoading)
    const userId = useAppSelector<string>(state => state.auth.user._id);
    const cardPacks = useAppSelector<PacksType[]>(store => store.packsList.cardPacks);

    const [activeDeleteModalPack, setActiveDeleteModalPack] = useState<boolean>(false)
    const [activeEditModalPack, setActiveEditModalPack] = useState<boolean>(false)

    const [id, setId] = useState<string>('');
    const [packName, setPackName] = useState<string>('')

    const setIdAndPackName = (id: string, name: string) => {
        setId(id)
        setPackName(name);
    }
    const editPackCardsHandler = (id: string, packName: string) => {
        setActiveEditModalPack(true)
        setIdAndPackName(id, packName);
    }
    const deletePackCardsHandler = (id: string, packName: string) => {
        setActiveDeleteModalPack(true)
        setIdAndPackName(id, packName);
    }


    const modalCloseHandler = () => {
        setActiveDeleteModalPack(false);
        setActiveEditModalPack(false);
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
                                        <SuperSmallButton learn disabled={isFetching}
                                                     onClick={() => learnHandler(el._id, el.name)}/>
                                        {el.user_id === userId &&
                                            <SuperSmallButton edit disabled={isFetching || activeDeleteModalPack}
                                                         onClick={() => editPackCardsHandler(el._id, el.name)}/>}
                                        {el.user_id === userId &&
                                            <SuperSmallButton delet disabled={isFetching}
                                                         onClick={() => deletePackCardsHandler(el._id, el.name)}/>}
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>

                <DeletePackModal open={activeDeleteModalPack}
                                 handleClose={modalCloseHandler}
                                 idCard={id}
                                 packNameFromPackListTable={packName}
                />
                <EditPackName
                    open={activeEditModalPack}
                              handleClose={modalCloseHandler}
                              idCard={id}
                              packNameFromPackListTable={packName}
                />

            </div>
    );
};
