import React from "react";
import {NavLink} from "react-router-dom";
import css from "./Header.module.css"
import {PATH} from "../../common/constants/Path";
import logo from "../../assets/img/logo.svg";
import {useAppSelector} from "../../common/hooks/hooks";

type HeaderType = {
    titleForHeader: string
}

const setActive = ({isActive}: { isActive: boolean }) => isActive ? css.activeLink : css.inactiveLink;

export const Header = (props: HeaderType) => {
    const randomAva = "https://thispersondoesnotexist.com/image"
    //добавил для отрисовки юзера:
    const {avatar, name} = useAppSelector(state => state.auth.user)

    return (<div>
            <nav className={css.nav}>
                {/*<h1>{props.titleForHeader}</h1>*/}
                <NavLink to={PATH.LOGIN} className={setActive}>Login</NavLink>
                <NavLink to={PATH.REGISTRATION} className={setActive}>Registration</NavLink>
                <NavLink to={PATH.PROFILE} className={setActive}>Profile</NavLink>
                <NavLink to={PATH.RECOVERY_PASS} className={setActive}>RecoveryPass</NavLink>
                <NavLink to={PATH.NEW_PASS} className={setActive}>NewPass</NavLink>
                <NavLink to={PATH.SEND_MAIL} className={setActive}>Mail Sanded</NavLink>
                <NavLink to={PATH.ERROR404} className={setActive}>Error404</NavLink>
                <NavLink to={PATH.PACK_LIST} className={setActive}>Packs</NavLink>
                <NavLink to={PATH.CARDS_LIST} className={setActive}>Cards</NavLink>
                <NavLink to={PATH.CARD_LEARNING} className={setActive}>Learning</NavLink>
                <NavLink to={PATH.TEST} className={setActive}>Components</NavLink>
            </nav>

                <div className={css.header}>
                    <a target="_blank" href="https://it-incubator.ru/"><img className={css.logo} src={logo} alt="logo"/></a>
                    <NavLink to={PATH.PROFILE}>
                        <div className={css.profileBlock}>
                            {/*<p*/}
                            {/*    data-tooltip="Всплывающая подсказка"*/}
                            {/*>Vasya</p>*/}
                            <p className={css.email}>{name ? name : "Somebody"}</p>
                            <img className={css.profilePhoto} src={avatar ? avatar : randomAva} alt="avatar"/>
                        </div>
                    </NavLink>

                </div>
        </div>
    )
}
