import {FC, useEffect, useState} from "react";
import SuperInputText from "../c1-InputText/SuperInputText";

type DebounceSearchPropsType = {
	searchValue: string
	setSearchValue: (value: string) => void
	//resetValue: (value: string) => void
	placeholder?: string
	disabled?: boolean
};

export const DebounceSearch: FC<DebounceSearchPropsType> = (
	{
		searchValue,
		setSearchValue,
		//resetValue,
		placeholder,
		disabled,

	}
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

	useEffect(()=> {
		setInputValue(searchValue)
	},[searchValue])

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
