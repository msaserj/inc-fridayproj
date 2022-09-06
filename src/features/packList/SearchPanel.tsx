import React, {useEffect} from 'react';
import s from "./PackList.module.css";

import SuperButton from "../../common/components/c2-Button/SuperButton";
import reset_filter from "../../assets/img/resetFilter.svg";
import {
    getCardsPackThunk, searchCardsPackThunk,
    setCurrentFilterAC,
    setSearchResultAC,
    setViewPacksAC
} from "./packList-reducer";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {DebounceSearchCards} from "../cardList/DebounceSearchCards/DebounceSearchCards";



export const SearchPanel = () => {
    const dispatch = useAppDispatch();
    const isLoad = useAppSelector<boolean>(state => state.app.appIsLoading)
    const isMyPacks = useAppSelector<boolean>(state => state.packsList.isMyPacks)
    const searchValue = useAppSelector<string>(state => state.packsList.searchResult)


    function getMyPackHandler() {
        dispatch(setViewPacksAC(true));
        dispatch(getCardsPackThunk());
        // dispatch(setSearchResultAC(""));
    }
    function getAllPackHandler() {
        dispatch(setViewPacksAC(false));
        dispatch(setCurrentFilterAC('0updated'));
        dispatch(getCardsPackThunk());
        // dispatch(setSearchResultAC(""));
    }
    function searchCardsByPackName(value: string)  {
        dispatch(setSearchResultAC(value));
    }

    function resetFilterHandler() {
        dispatch(setSearchResultAC(``));
        console.log(`resetFilterHandler clicked`)
        dispatch(getCardsPackThunk());
    }
    useEffect(() => {
        if (searchValue) {
            dispatch(searchCardsPackThunk(searchValue));
        }
    }, [dispatch, searchValue]);

    console.log("Search Panel", searchValue)
    return (
        <div>
            <div className={s.searchHeader}>
                <div>
                    <h3>Search</h3>
                    {/*<DebounceSearch/>*/}
                    <DebounceSearchCards

                        searchValue={searchValue}
                        setSearchValue={searchCardsByPackName}
                        placeholder={"Search by question..."}
                        //disabled={isFetchingCards}
                    />
                </div>
                <div>
                    <h3>Show packs cards</h3>
                    <div className={s.userChooseButton}>
                        <SuperButton style={{minWidth: "120px"}}
                                     onClick={getMyPackHandler}
                                     red={isMyPacks && !isLoad}
                                     disabled={isLoad}>
                            My packs
                        </SuperButton >
                        <SuperButton style={{minWidth: "120px"}}
                                     onClick={getAllPackHandler}
                                     red={!isMyPacks && !isLoad}
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

