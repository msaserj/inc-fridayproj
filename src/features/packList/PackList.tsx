import React from 'react';
import s from "./PackList.module.css"
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {addNewPackThunk, getCardsPackThunk, setCurrentPageCardPacksAC} from "./packList-reducer";
import SuperButton from "../../common/components/c2-Button/SuperButton";
import {PacksListTable} from "./PackListTable/PackListTable";
import {Paginator} from "./Paginator/Paginator";
import {SearchPanel} from "./SearchPanel";
import {Navigate} from "react-router-dom";
import {PATH} from "../../common/constants/Path";


export const PackList = () => {

    const dispatch = useAppDispatch();

    const currentPage = useAppSelector<number>(store => store.packsList.page);
    const pageSize = useAppSelector<number>(store => store.packsList.pageCount);
    const totalCountPage = useAppSelector<number>(store => store.packsList.cardPacksTotalCount);



    //будет функция добавления новой колоды
    function addCardsPackHandler() {
        dispatch(addNewPackThunk("addNewPack", false))
        alert('add new pack')
    }


    function changePageHandler(page: number) {
        dispatch(setCurrentPageCardPacksAC(page))
        dispatch(getCardsPackThunk());
    }
    const user_ID = useAppSelector(state => state.auth.user._id);
    if (!user_ID) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <>
            <div className={s.mainBlock}>
                <div className={s.head}>
                    <h2>Packs list</h2>
                    <SuperButton onClick={addCardsPackHandler}>Add new pack</SuperButton>
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
            </div>
        </>

    );
};


