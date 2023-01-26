import React, {useEffect, useState} from 'react';
import css from "./PackList.module.css";
import SuperButton from "../../common/components/Primitive/c2-Button/SuperButton";
import {
	filterCardsCountAC,
	searchCardsPackThunk,
	setCurrentFilterAC,
	setSearchResultAC,
	setViewPacksAC
} from "./packList-reducer";
import {useAppDispatch, useAppSelector, useDebounce} from "../../common/hooks/hooks";
import {DebounceSearch} from "../../common/utils/DebounceSearch/DebounceSearch";
import {SuperSmallButton} from "../../common/components/Primitive/SmallButtons/SuperSmallButton/SuperSmallButton";
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

export const SearchPanel = () => {
	const dispatch = useAppDispatch();
	const isLoad = useAppSelector<boolean>(state => state.app.appIsLoading)
	const isMyPacks = useAppSelector(state => state.packsList.isMyPacks)
	const searchValue = useAppSelector<string>(state => state.packsList.searchResult)
	const isFetching = useAppSelector<boolean>(state => state.app.appIsLoading)
	const servMaxValue = useAppSelector<any>(state => state.packsList.maxCardsCount)
	const servMinValue = useAppSelector<any>(state => state.packsList.minCardsCount)
	const pageCount = useAppSelector<number>(state => state.packsList.pageCount)
	const useId = useAppSelector(state => state.auth.user._id)
	const [first, setFirst] = useState(true) // борьба с двойной отрисовкой
	// console.log(isMyPacks, `-isMyPacks`)
	// console.log(useId, `-useId`)

	const [servMinValueState, setServMinValue] = React.useState<number>(servMinValue);
	const [servMaxValueState, setServMaxValue] = React.useState<number>(servMaxValue);
	const dValueMin = useDebounce(servMinValueState, 1000)
	const dValueMax = useDebounce(servMaxValueState, 1000)

	useEffect(() => {
		if (first) {
			dispatch(searchCardsPackThunk(searchValue, servMinValueState, servMaxValueState, pageCount, isMyPacks));
			setFirst(false) // борьба с двойной отрисовкой
		}
	}, [searchValue, dValueMin, dValueMax, isMyPacks]);

	useEffect(() => {
		// console.log(servMaxValue, "servMaxValue")
		setServMinValue(servMinValue)
		setServMaxValue(servMaxValue)
	}, [servMaxValue, servMinValue])

	function resetFilterHandler() {
		setServMinValue(0)
		setServMaxValue(servMaxValue)
		// setValue([0, servMaxValue])
		setFirst(true) // борьба с двойной отрисовкой
		dispatch(filterCardsCountAC(0, servMaxValue))
		dispatch(setSearchResultAC(``))
	}

	// The order of the dispatches important!!!
	function getMyPackHandler() {
		console.log(66)
		dispatch(setViewPacksAC(useId));
		setFirst(true) // борьба с двойной отрисовкой
		resetFilterHandler()
	}

	function getAllPackHandler() {
		dispatch(setViewPacksAC(undefined));
		dispatch(setCurrentFilterAC('0updated'));
		resetFilterHandler()
		setFirst(true) // борьба с двойной отрисовкой
	}

	function searchCardsByPackName(value: string) {
		dispatch(setSearchResultAC(value));
		setFirst(true) // борьба с двойной отрисовкой
	}

	const handleChange = (event: Event, newValue: any) => {
		//setValue(newValue as number[]);
		console.log(newValue)
		setServMinValue(newValue[0] as number)
		setServMaxValue(newValue[1] as number)
		setFirst(true) // борьба с двойной отрисовкой
	};

	const handleInputChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(Number(event.target.value) < servMaxValueState) {
			setServMinValue(Number(event.target.value))
		}
	}

	const packsCount = 100
	const handleInputChangeMax = (event: React.ChangeEvent<HTMLInputElement>,) => {
		if (Number(event.target.value) <= packsCount) {
			setServMaxValue(Number(event.target.value))
		}
	}


	return (
		<div>
			<div className={css.searchHeader}>
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
					<div className={css.userChooseButton}>
						<SuperButton style={{minWidth: "120px"}}
									 onClick={getMyPackHandler}
									 red={!!isMyPacks && !isLoad}
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
				<div className={css.rangeBlock}>
					<h3>Number of cards</h3>
					<div className={css.sliderBlock}>
						<MuiInput
							className={css.muiInput}
							value={servMinValueState.toFixed()} //  toFixed чтобы при вводе 05 в инпуте было 5
							size="small"
							onChange={handleInputChangeMin}
							inputProps={{
								step: 1,
								min: 0,
								max: servMaxValueState,
								type: 'number',
								'aria-labelledby': 'input-slider',
							}}/>
						<Slider
							style={{width: "600px"}}
							disableSwap
							max={servMaxValue}
							value={[servMinValueState, servMaxValueState]}
							onChange={handleChange}
							valueLabelDisplay="auto"
						/>
						<MuiInput
							className={css.muiInput}
							//style={{}}
							value={servMaxValueState.toFixed()}
							size="small"
							onChange={handleInputChangeMax}
							inputProps={{
								step: 1,
								min: servMinValueState,
								max: 100,
								type: 'number',
								'aria-labelledby': 'input-slider',
							}}/>
					</div>
				</div>
				<div className={css.reset_filter}>
					<SuperSmallButton disabled={isLoad} filter onClick={resetFilterHandler}/>
				</div>
			</div>
		</div>
	);
};

