import {FC, useEffect, useState} from "react";
import SuperInputText from "../../../common/components/c1-InputText/SuperInputText";

type DebounceSearchPropsType = {
	searchValue: string
	setSearchValue: (value: string) => void
	placeholder?: string
	disabled?: boolean
};

export const DebounceSearchCards: FC<DebounceSearchPropsType> = (
	{searchValue, setSearchValue, placeholder, disabled}
) => {
	const [inputValue, setInputValue] = useState<string>(searchValue);

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
