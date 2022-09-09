import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import css from './SuperPasswordInput.module.css'
import eyeIcon from './eyeIcon.svg'
import blind from "./blind.png";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

const SuperPasswordInput: React.FC<SuperInputTextPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        placeholder,
        ...restProps
    }
) => {
    const [passwordType, setPasswordType] = useState(true);
    const inputType = passwordType ? "password" : "text";
    const changeInputTypeHandler = () => {
        setPasswordType(!passwordType);
    };
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter
        && e.key === 'Enter'
        && onEnter()
    }
    const finalSpanClassName = `${css.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${css.input} ${error ? css.errorInput : css.Input} ${className}` // need to fix with (?:) and s.superInput
    return (
        <div className={css.main}>
            <div>
                <input
                    type={inputType}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}
                    placeholder={placeholder}
                    {...restProps}
                />
                <div className={css.eyeButton} onClick={changeInputTypeHandler}>
                </div>
                {error && <span className={finalSpanClassName}>{error}</span>}
            </div>
            <div className={css.eyeButton} onClick={changeInputTypeHandler}>
                {passwordType
                    ? <img className={css.eyeIcon} src={blind} alt={"closed eye icon"}/>
                    : <img className={css.eyeIcon} src={eyeIcon} alt={"eye icon"}/>}
            </div>
        </div>
    )
}

export default SuperPasswordInput
