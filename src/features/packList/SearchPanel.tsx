import React from 'react';
import s from "./PackList.module.css";
import {DebounceSearch} from "./DebounceSearch/DebounceSearch";
import SuperButton from "../../common/components/c2-Button/SuperButton";
import reset_filter from "../../assets/img/resetFilter.svg";
import {
    getCardsPackThunk,
    getMyCardsPackThunk,
    setCurrentFilterAC,
    setSearchResultAC,
    setViewPacksAC
} from "./packList-reducer";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";

export const SearchPanel = () => {
    const dispatch = useAppDispatch();
    const isLoad = useAppSelector<boolean>(store => store.app.appIsLoading)


    function getMyPackHandler() {
        dispatch(setViewPacksAC(true));
        dispatch(getMyCardsPackThunk());
    }
    function getAllPackHandler() {
        dispatch(setViewPacksAC(false));
        dispatch(setCurrentFilterAC('0updated'));
        dispatch(getCardsPackThunk());
    }

    function resetFilterHandler() {
        dispatch(setSearchResultAC(``));
        console.log(`resetFilterHandler clicked`)
        dispatch(getCardsPackThunk());
    }
    return (
        <div>
            <div className={s.searchHeader}>
                <div>
                    <h3>Search</h3>
                    <DebounceSearch/>
                </div>
                <div>
                    <h3>Show packs cards</h3>
                    <div className={s.userChooseButton}>
                        <SuperButton style={{minWidth: "120px"}}
                                     onClick={getMyPackHandler}
                                     disabled={isLoad}>
                            My packs
                        </SuperButton >
                        <SuperButton style={{minWidth: "120px"}}
                                     onClick={getAllPackHandler}
                                     disabled={isLoad}>
                            All packs
                        </SuperButton>
                    </div>
                </div>

                <div className={s.rangeBlock}>
                    <h3>Number of cards</h3>
                    <div> будет двойной ползунок</div>
                </div>
                <div className={s.reset_filter}>
                    <img src={reset_filter} alt="reset_filter" onClick={resetFilterHandler}/>
                </div>
            </div>
        </div>
    );
};

