import s from "./SendMail.module.css";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../common/constants/Path";
import React from "react";
import emailIco from "../../../../assets/img/emailIcon.svg"
import {useAppSelector} from "../../../../common/hooks/hooks";


export const SendMail = () => {
    const email = useAppSelector<string>(state => state.auth.RecoveryPswd.email)
    return <div className={s.mainBlock}>

        <div className={s.SandMailBlock}>
            <h2>Check Email</h2>
            <div>
                <img src={emailIco} alt="emailIco"/>
            </div>

            <span className={s.spanInfo}>We’ve sent an Email with instructions to {email}</span>
            <div className={s.tryLoggin}>
                <NavLink
                    to={PATH.LOGIN}
                >Back to logging in</NavLink>
            </div>
        </div>
    </div>
}