import {NavLink, useNavigate} from "react-router-dom";
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

    const navigate = useNavigate()

    const [activeDeleteModalPack, setActiveDeleteModalPack] = useState<boolean>(false)
    const [activeEditModalPack, setActiveEditModalPack] = useState<boolean>(false)

    const [id, setId] = useState<string>('');
    const [packName, setPackName] = useState<string>('')
    const [privatePack, setPrivatePack] = useState<boolean>(false)

    const setIdAndPackName = (id: string, name: string, privatePack: boolean) => {
        setId(id)
        setPackName(name);
        setPrivatePack(privatePack)
    }
    const editPackCardsHandler = (id: string, packName: string, privatePack: boolean) => {
        setActiveEditModalPack(true)
        setIdAndPackName(id, packName, privatePack);
        // dispatch(getCardsTC({cardsPack_id}));

    }
    const deletePackCardsHandler = (id: string, packName: string) => {
        setActiveDeleteModalPack(true)
        setIdAndPackName(id, packName, privatePack);
    }


    const modalCloseHandler = () => {
        setActiveDeleteModalPack(false);
        setActiveEditModalPack(false);
    }
    const learnHandler = (id: string, name: string) => {
        // alert("You press learn button  " + name)

        // dispatch(setLearnPackNameAC(name));
        navigate(PATH.CARD_LEARNING + id);

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
                                        <SuperSmallButton learn disabled={isFetching || (el.cardsCount === 0)}
                                                          onClick={() => learnHandler(el._id, el.name)}/>
                                        {el.user_id === userId &&
                                            <SuperSmallButton edit disabled={isFetching || activeDeleteModalPack}
                                                              onClick={() => editPackCardsHandler(el._id, el.name, el.private)}/>}
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
                    privatePackFromPackListTable={privatePack}
                />

            </div>
    );
};
