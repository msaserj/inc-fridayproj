import {FC, useEffect, useState} from "react";
import SuperInputText from "../c1-InputText/SuperInputText";

type DebounceSearchPropsType = {
	resetValue: string
	setSearchValue: (value: string) => void
	placeholder?: string
	disabled?: boolean
};

export const DebounceSearch: FC<DebounceSearchPropsType> = (
	{
		resetValue,
		setSearchValue,
		placeholder,
		disabled,
	}
) => {
	console.log("Debounce", resetValue)
	const [inputValue, setInputValue] = useState<string>(resetValue);
	useEffect(() => {
		const id: number = +setTimeout(() => {
			setSearchValue(inputValue);
		}, 1500);
		return () => clearTimeout(id);
	}, [setSearchValue, inputValue]);

	useEffect(()=> {
		setInputValue(resetValue)
	},[resetValue])
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
