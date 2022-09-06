import React from 'react';
import {PATH} from "../../constants/Path";
import css from "./BackToPackList.module.css"
import arrow from "../../../assets/img/arrow.svg";
import {NavLink} from "react-router-dom";

export const BackToPackList = () => {
    return (
        <>
            {/*<div className={css.backToBlock}>*/}
            <NavLink className={css.navLink} to={PATH.PACK_LIST}>
                <img src={arrow} alt="arrow"/><p>Back to packs List</p>
            </NavLink>
        {/*</div>*/}
        </>
    );
};
