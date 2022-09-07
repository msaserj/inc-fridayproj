import React, {DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState} from 'react'

import css from './SuperEditableSpan.module.css'
import SuperInputText from "../c1-InputText/SuperInputText";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type SuperEditableSpanType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    spanProps?: DefaultSpanPropsType // пропсы для спана
    editModeUp?: boolean
}

const SuperEditableSpan: React.FC<SuperEditableSpanType> = (
    {
        autoFocus,
        onBlur,
        onEnter,
        spanProps,
        editModeUp,
        ...restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}


    const onEnterCallback = () => {
        setEditMode(false)
        onEnter && onEnter()
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false)
        onBlur && onBlur(e)
    }
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true) // включить editMode при двойном клике
        onDoubleClick && onDoubleClick(e)
    }
    const spanClassName = `${css.span} ${className}`
    return (
        <div className={css.main} >
            {editMode || editModeUp
                ? (
                        <SuperInputText
                            className={css.input}
                            autoFocus
                            onBlur={onBlurCallback}
                            onEnter={onEnterCallback}
                            {...restProps}
                        />

                ) : (

                         <span
                             onDoubleClick={onDoubleClickCallBack}
                             className={spanClassName}
                             {...restSpanProps}
                         >{children || restProps.value}</span>

                )
            }
        </div>
    )
}

export default SuperEditableSpan
