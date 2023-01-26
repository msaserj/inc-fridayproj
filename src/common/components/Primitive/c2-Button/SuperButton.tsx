import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import css from './SuperButton.module.css'


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,
        ...restProps
    }
) => {
    const finalClassName = `${red ? css.red : css.button} ${className}`
    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}

export default SuperButton
