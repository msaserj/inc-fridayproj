import css from "./PackList.module.css"
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {getCardsPackThunk, setCurrentPageCardPacksAC} from "./packList-reducer";
import SuperButton from "../../common/components/Primitive/c2-Button/SuperButton";
import {PacksListTable} from "./PackListTable/PackListTable";
import {Paginator} from "../../common/components/Paginator/Paginator";
import {SearchPanel} from "./SearchPanel";
import {Navigate} from "react-router-dom";
import {PATH} from "../../common/constants/Path";
import * as React from "react";
import {useState} from "react";
import {AddNewPackModal} from "./AddNewPackModal/AddNewPackModal";
import {getCurrentPage, getIsFetchingCards, getPageSize, getTotalCountPage} from "./packsSelectors";
import {getIsLoadingApp} from "../../App/appSelectors";
import {getUserId} from "../auth/profile/profileSelectors";


export const PackList = () => {
    const dispatch = useAppDispatch();

    const currentPage = useAppSelector(getCurrentPage);
    const pageSize = useAppSelector(getPageSize);
    const totalCountPage = useAppSelector(getTotalCountPage);
    const isFetching = useAppSelector(getIsFetchingCards);
    const isLoggedIn = useAppSelector(getUserId)

    const [activeModalPack, setModalActivePack] = useState<boolean>(false)

    const addCardsPackHandler = () => setModalActivePack(true)
    const changePageHandler = (page: number) => {
        dispatch(setCurrentPageCardPacksAC({page: page}))
        dispatch(getCardsPackThunk());
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    const modalCloseHandler = () => setModalActivePack(false);

    return (
        <>
            <div className={css.mainBlock}>
                <div className={css.head}>
                    <h2>Packs list</h2>
                    <SuperButton disabled={isFetching} onClick={addCardsPackHandler}>Add new pack</SuperButton>
                </div>
                <SearchPanel/>
                <section className={css.packList}>
                    <PacksListTable/>
                    <div className={css.paginator}>
                        <Paginator currentPage={currentPage}
                                   pageSize={pageSize}
                                   totalCount={totalCountPage}
                                   onPageChange={changePageHandler}
                                   siblingCount={2}
                        />
                    </div>

                </section>
                <AddNewPackModal open={activeModalPack} handleClose={modalCloseHandler}/>
            </div>
        </>
    );
};


