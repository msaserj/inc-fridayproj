import {FC, useEffect, useState} from "react";
import SuperInputText from "../../../common/components/c1-InputText/SuperInputText";

type DebounceSearchPropsType = {
	searchValue: string
	setSearchValue: (value: string) => void
	placeholder?: string
	disabled?: boolean
	onChangeResetValue?: () => void
};

export const DebounceSearchCards: FC<DebounceSearchPropsType> = (
	{searchValue, setSearchValue, placeholder, disabled,onChangeResetValue}
) => {
	console.log("Debounce", searchValue)
	const [inputValue, setInputValue] = useState<string>(searchValue);


	console.log("Debounce innerState", inputValue)

	useEffect(() => {
		const id: number = +setTimeout(() => {
			setSearchValue(inputValue);
		}, 1500);

		return () => {
			clearTimeout(id);
		};
	}, [setSearchValue, inputValue]);

	const onChangeValue = (value: string) => {
		setInputValue(value);
	};


	return (
		<SuperInputText
			placeholder={placeholder}
			value={inputValue}
			onChangeText={onChangeValue}
			disabled={disabled}
		/>
	);
};
