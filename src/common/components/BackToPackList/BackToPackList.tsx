import React from 'react';
import {PATH} from "../../constants/Path";
import css from "../../../features/auth/profile/Profile.module.css";
import arrow from "../../../assets/img/arrow.svg";
import {NavLink} from "react-router-dom";

export const BackToPackList = () => {
    return (
        <>
            <NavLink to={PATH.PACK_LIST}>
                <div className={css.backToBlock}>
                    <img src={arrow} alt="arrow"/>
                    <p>Back to packs List</p>
                </div>
            </NavLink>
        </>
    );
};
