import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {searchCardsPackThunk, setSearchResultAC} from "../packList-reducer";
import {AppThunkType} from "../../../App/store";
import {useRef} from "react";
import s from "./Debounce.module.css"
import SuperInputText from "../../../common/components/c1-InputText/SuperInputText";

export const DebounceSearch = () => {

	const dispatch = useAppDispatch();
	const searchValue = useAppSelector<string>(state => state.packsList.searchResult);

	const Debounced = (func: Function, delay: number) => {
		const ref = useRef(0);
		return (args: AppThunkType) => {
			clearTimeout(ref.current);
			ref.current = Number(setTimeout(() => func(args), delay));
		};
	};
	const debounce = Debounced(dispatch, 1000);

	const handleInputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
		debounce(searchCardsPackThunk(e.currentTarget.value));
		dispatch(setSearchResultAC(e.currentTarget.value));
	}

	return (
		<div className={s.mainContent}>
			<SuperInputText placeholder={"Provide your text..."}
					   value={searchValue}
					   onChange={handleInputEvent}
							className={s.input_search}
			/>
		</div>
	);
};
