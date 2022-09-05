import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import delIco from "./delete.svg"
import learnIco from "./teach.svg"
import filterIco from "./resetFilter.svg"
import editIco from "./edit.svg"
import css from "./SmallButton.module.css"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type ButtonType = DefaultButtonPropsType & {
    //SMALL BUTTON OPTIONS!!!!
    delet?: boolean
    learn?: boolean
    filter?: boolean
    edit?: boolean
}
export const SuperSmallButton: React.FC<ButtonType> = ({
    delet,
    learn,
    filter,
    edit,
    ...restProps
}) => {
    const Buttontype = delet ? delIco : "?"
    && learn ? learnIco : "?"
    && filter ? filterIco : "?"
    && edit ? editIco : "?"

    return <button {...restProps} className={css.button} ><img src={Buttontype} alt="del"/></button>
}
