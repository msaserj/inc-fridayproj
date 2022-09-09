import React, {
	ChangeEvent,
	DetailedHTMLProps,
	InputHTMLAttributes,
	KeyboardEvent,
	useState
} from "react";
import css from "./InputPassword.module.css";
import eyeIcon from "../../../assets/img/eye.png";
import blind from "../../../assets/img/blind.png";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperInputTextPropsType = DefaultInputPropsType & {
	onChangeText?: (value: string) => void
	onEnter?: () => void
	error?: string
	spanClassName?: string
};

const InputPassword: React.FC<SuperInputTextPropsType> = (
	{
		placeholder,
		type,
		onChange, onChangeText,
		onKeyPress, onEnter,
		error,
		className, spanClassName,
		...restProps
	}
) => {
	const [passwordType, setPasswordType] = useState(true);
	const inputType = passwordType ? "password" : "text";

	const changeInputTypeHandler = () => {
		setPasswordType(!passwordType);
	};

	const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(e);
		onChangeText && onChangeText(e.currentTarget.value);
	};

	const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
		onKeyPress && onKeyPress(e);
		onEnter && e.key === 'Enter' && onEnter();
	}

	const finalSpanClassName = `${css.error} ${spanClassName ? spanClassName : ''}`;
	const finalInputClassName = `${css.superInput} ${error ? css.errorInput : ""} ${className ? className : ""}`;

	return (
		<div className={css.inputPassword}>
			<input
				type={inputType}
				onChange={onChangeCallback}
				onKeyDown={onKeyPressCallback}
				className={finalInputClassName}
				{...restProps}
			/>
			<div className={css.eyeButton} onClick={changeInputTypeHandler}>
				{passwordType
					? <img src={eyeIcon} alt={"closed eye icon"}/>
					: <img src={blind} alt={"eye icon"}/>}
			</div>
			{error && <span className={finalSpanClassName}>{error}</span>}
		</div>
	);
};
