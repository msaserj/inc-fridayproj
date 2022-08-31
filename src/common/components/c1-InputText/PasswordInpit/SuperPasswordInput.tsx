import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import s from './SuperPasswordInput.module.css'
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
    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${s.input} ${error ? s.errorInput : s.Input} ${className}` // need to fix with (?:) and s.superInput
    return (
        <div className={s.main}>
            <div>
                <input
                    type={inputType}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}
                    placeholder={placeholder}
                    {...restProps}
                />
                <div className={s.eyeButton} onClick={changeInputTypeHandler}>
                </div>
                {error && <span className={finalSpanClassName}>{error}</span>}
            </div>
            <div className={s.eyeButton} onClick={changeInputTypeHandler}>
                {passwordType
                    ? <img className={s.eyeIcon} src={blind} alt={"closed eye icon"}/>
                    : <img className={s.eyeIcon} src={eyeIcon} alt={"eye icon"}/>}
            </div>
        </div>
    )
}

export default SuperPasswordInput
