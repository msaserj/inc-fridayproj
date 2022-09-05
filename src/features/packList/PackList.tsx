import s from "./PackList.module.css"
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {getCardsPackThunk, setCurrentPageCardPacksAC} from "./packList-reducer";
import SuperButton from "../../common/components/c2-Button/SuperButton";
import {PacksListTable} from "./PackListTable/PackListTable";
import {Paginator} from "./Paginator/Paginator";
import {SearchPanel} from "./SearchPanel";
import {Navigate} from "react-router-dom";
import {PATH} from "../../common/constants/Path";
import * as React from "react";
import {useEffect, useState} from "react";
import {AddNewPack} from "./AddNewPack/AddNewPack";


export const PackList = () => {

    const dispatch = useAppDispatch();
    const currentPage = useAppSelector<number>(store => store.packsList.page);
    const pageSize = useAppSelector<number>(store => store.packsList.pageCount);
    const totalCountPage = useAppSelector<number>(store => store.packsList.cardPacksTotalCount);
    const isFetching = useAppSelector<boolean>(store => store.app.appIsLoading);
    const isLoggedIn = useAppSelector<string>(state => state.auth.user._id)
    useEffect(()=>
            dispatch(getCardsPackThunk()),
        [dispatch])

    const [activeModalPack, setModalActivePack] = useState<boolean>(false)

    const addCardsPackHandler = () => setModalActivePack(true)
    const changePageHandler = (page: number) => {
        dispatch(setCurrentPageCardPacksAC(page))
        dispatch(getCardsPackThunk());
    }
    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    const modalCloseHandler = () => setModalActivePack(false);
    return (
        <>
            <div className={s.mainBlock}>
                <div className={s.head}>
                    <h2>Packs list</h2>
                    <SuperButton disabled={isFetching} onClick={addCardsPackHandler}>Add new pack</SuperButton>
                </div>
                <SearchPanel/>
                <section className={s.packList}>
                    <PacksListTable/>
                    <Paginator currentPage={currentPage}
                               pageSize={pageSize}
                               totalCount={totalCountPage}
                               onPageChange={changePageHandler}
                               siblingCount={2}
                    />
                </section>
                <AddNewPack open={activeModalPack} handleClose={modalCloseHandler}/>
            </div>
        </>
    );
};


