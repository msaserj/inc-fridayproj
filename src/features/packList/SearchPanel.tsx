import React, {useEffect} from 'react';
import s from "./PackList.module.css";
import SuperButton from "../../common/components/c2-Button/SuperButton";

import {
    filterCardsCountAC,
    searchCardsPackThunk,
    setCurrentFilterAC,
    setSearchResultAC,
    setViewPacksAC
} from "./packList-reducer";
import {useAppDispatch, useAppSelector, useDebounce} from "../../common/hooks/hooks";
import {DebounceSearch} from "../../common/components/DebounceSearch/DebounceSearch";
import {SuperSmallButton} from "../../common/components/SmallButtons/SuperSmallButton/SuperSmallButton";
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

export const SearchPanel = () => {
    const dispatch = useAppDispatch();
    const isLoad = useAppSelector<boolean>(state => state.app.appIsLoading)
    const isMyPacks = useAppSelector<boolean>(state => state.packsList.isMyPacks)
    const searchValue = useAppSelector<string>(state => state.packsList.searchResult)
    const isFetching = useAppSelector<boolean>(state => state.app.appIsLoading)
    const servMaxValue = useAppSelector<any>(state => state.packsList.max)
    const servMinValue = useAppSelector<any>(state => state.packsList.min)
    console.log(servMaxValue)

    const [value, setValue] = React.useState<number[]>([servMinValue, servMaxValue]);

    // The order of the dispatches important!!!
    function getMyPackHandler() {
        dispatch(setViewPacksAC(true));
        resetFilterHandler()
    }
    function getAllPackHandler() {
        dispatch(setViewPacksAC(false));
        dispatch(setCurrentFilterAC('0updated'));
        resetFilterHandler()
    }
    function searchCardsByPackName(value: string) {
        dispatch(setSearchResultAC(value));
    }
    function resetFilterHandler() {
        setValue([0, 110])
        dispatch(filterCardsCountAC(0, 110))
        dispatch(setSearchResultAC(``));
        // dispatch(getCardsPackThunk());
        console.log("resetFilterHandler()")
    }


    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleInputChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(Number(event.target.value) < value[1]) {
            setValue([Number(event.target.value), value[1]])
        }
    }

    const packsCount = 100
    const handleInputChangeMax = (event: React.ChangeEvent<HTMLInputElement>, ) => {
        if(Number(event.target.value) <= packsCount) {
            setValue([value[0], Number(event.target.value)])
        }
    }
    const dValue = useDebounce(value, 1000)
    useEffect(() => {
        if (searchValue || value) {
            dispatch(searchCardsPackThunk(searchValue, value[0], value[1]));
            console.log("IF", searchValue, value[0], value[1])
        }
    }, [searchValue, dValue]);
    return (
        <div>
            <div className={s.searchHeader}>
                <div>
                    <h3>Search</h3>
                    <DebounceSearch
                        resetValue={searchValue}
                        setSearchValue={searchCardsByPackName}
                        placeholder={"Search by pack name..."}
                        disabled={isFetching}
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
                        </SuperButton>
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
                    <div className={s.sliderBlock}>
                        <MuiInput
                            className={s.muiInput}
                            value={value[0].toFixed()}
                            size="small"
                            onChange={handleInputChangeMin}
                            // onBlur={handleBlur}
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: value[1],
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}/>
                        <Slider
                            style={{width: "600px"}}
                            disableSwap
                            //getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            // getAriaValueText={valuetext}
                        />
                        <MuiInput
                            className={s.muiInput}
                            //style={{}}
                            value={(value[1]).toFixed()}
                            size="small"
                            onChange={handleInputChangeMax}
                            // onBlur={handleBlur}
                            inputProps={{
                                step: 1,
                                min: value[0],
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}/>

                    </div>
                </div>
                <div className={s.reset_filter}>
                    <SuperSmallButton disabled={isLoad} filter onClick={resetFilterHandler}/>
                </div>
            </div>
        </div>
    );
};

