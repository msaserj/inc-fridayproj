import React from "react";
import css from './DotedLoader.module.css'


type DotedLoaderType = {
    large?: boolean
    small?: boolean
}
// Options:
// default - 30px dots (not required!!!)
// small - 18px dots
// large - 60px dots
export const DotedLoader: React.FC<DotedLoaderType> = (
    {
        large,
        small,
        ...restProps
    }) => {

    const finalClassName = `${small ? css.small : large ? css.large : ''} ${css.main}`

    return (
        <div className={finalClassName}>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    )
}