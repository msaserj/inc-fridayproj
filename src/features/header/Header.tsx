import React from "react";
import {NavLink} from "react-router-dom";
import css from "./Header.module.css"
import {PATH} from "../../common/constants/Path";
import logo from "../../assets/img/logo.svg";

type HeaderType = {
    titleForHeader: string
}

const setActive = ({isActive}: { isActive: boolean }) => isActive ? css.activeLink : css.inactiveLink;

export const Header = (props: HeaderType) => {

    return (<div>
            <nav className={css.nav}>
                {/*<h1>{props.titleForHeader}</h1>*/}
                <NavLink to={PATH.LOGIN} className={setActive}>Login</NavLink>
                <NavLink to={PATH.REGISTRATION} className={setActive}>Registration</NavLink>
                <NavLink to={PATH.PROFILE} className={setActive}>Profile</NavLink>
                <NavLink to={PATH.RECOVERY_PASS} className={setActive}>RecoveryPass</NavLink>
                <NavLink to={PATH.NEW_PASS} className={setActive}>NewPass</NavLink>
                <NavLink to={PATH.ERROR404} className={setActive}>Error404</NavLink>
                <NavLink to={PATH.TEST} className={setActive}>Components</NavLink>
            </nav>

                <div className={css.header}>
                    <img className={css.logo} src={logo} alt="logo"/>
                    <div className={css.profileBlock}>
                        <p
                            data-tooltip="Всплывающая подсказка"
                        >Vasya</p>
                        <img className={css.profilePhoto} src="https://thispersondoesnotexist.com/image" alt="avatar"/>
                    </div>
                    {/*<h1>Profile</h1>*/}
                </div>

        </div>

    )
}