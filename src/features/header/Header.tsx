import React from "react";
import {NavLink} from "react-router-dom";
import css from "./Header.module.css"
import {PATH} from "../../common/constants/Path";
import logo from "../../assets/img/logo-no-background.png";
import {useAppSelector} from "../../common/hooks/hooks";
import {RANDOM_AVA} from "../../common/constants/constants";
import {getAvatar, getUserName} from "../auth/profile/profileSelectors";


const setActive = ({isActive}: { isActive: boolean }) => isActive ? css.activeLink : css.inactiveLink;

export const Header = () => {
    const name = useAppSelector(getUserName)
    const avatar = useAppSelector(getAvatar)

    return (<div>
            {/*<nav className={css.nav}>*/}
            {/*    <NavLink to={PATH.LOGIN} className={setActive}>Login</NavLink>*/}
            {/*    <NavLink to={PATH.REGISTRATION} className={setActive}>Registration</NavLink>*/}
            {/*    <NavLink to={PATH.PROFILE} className={setActive}>Profile</NavLink>*/}
            {/*    <NavLink to={PATH.RECOVERY_PASS} className={setActive}>RecoveryPass</NavLink>*/}
            {/*    <NavLink to={PATH.NEW_PASS} className={setActive}>NewPass</NavLink>*/}
            {/*    <NavLink to={PATH.SEND_MAIL} className={setActive}>Mail Sanded</NavLink>*/}
            {/*    <NavLink to={PATH.ERROR404} className={setActive}>Error404</NavLink>*/}
            {/*    <NavLink to={PATH.PACK_LIST} className={setActive}>Packs</NavLink>*/}
            {/*    <NavLink to={PATH.CARDS_LIST} className={setActive}>Cards</NavLink>*/}
            {/*    <NavLink to={PATH.CARD_LEARNING} className={setActive}>Learning</NavLink>*/}
            {/*    <NavLink to={PATH.TEST} className={setActive}>Components</NavLink>*/}
            {/*</nav>*/}

            <div className={css.header}>
                <a target="_blank" href="https://github.com/msaserj/inc-fridayproj"><img className={css.logo} src={logo} alt="logo"/></a>
                <NavLink to={PATH.PROFILE}>
                    <div className={css.profileBlock}>
                        <p className={css.email}>{name ? name : "Somebody"}</p>
                        <img className={css.profilePhoto} src={avatar ? avatar : RANDOM_AVA} alt="avatar"/>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
