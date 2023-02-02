import {Route, Routes} from "react-router-dom";
import {PATH} from "../constants/Path";
import {Login} from "../../features/auth/login/Login";
import {Registration} from "../../features/auth/registration/Registration";
import {Profile} from "../../features/auth/profile/Profile";
import {RecoveryPass} from "../../features/auth/recoveryPass/Recovery/RecoveryPass";
import {NewPass} from "../../features/auth/newPass/NewPass";
import {PageNotFound} from "../components/error404/Error404";
import {AllComponents} from "../components/AllComponents";
import React from "react";
import {useAppSelector} from "../hooks/hooks";
import {DotedLoader} from "../components/Primitive/c8-Loaders/DotedLoader/DotedLoader";
import {Navigate} from "react-router-dom";
import {PackList} from "../../features/packList/PackList";
import {CardsList} from "../../features/cardList/CardsList";
import {SendMail} from "../../features/auth/recoveryPass/SendMail/SendMail";
import css from "./RoutesComponents.module.css"
import {CardLearning} from "../../features/Learning/CardLearning";
import {getAppIsInitialized, getIsLoadingApp} from "../../App/appSelectors";

export const RoutesComponent = () => {
    const initialized = useAppSelector(getAppIsInitialized)
    const isLoading = useAppSelector<boolean>(getIsLoadingApp)

    if (!initialized) {
        return(
            <div style={{position: "fixed", top: "50%", width: "100%"}}>
                <DotedLoader large />
            </div>
        )
    }

    // Не включать, а то убьет перерисовка !!!
    // if (isLoading) {
    //     return(
    //         <div style={{position: "fixed", top: "50%", width: "100%"}}>
    //             <DotedLoader large />
    //         </div>
    //     )
    // }

    return (
        <div className={css.routes}>
            <Routes>
                <Route path={PATH.LOGIN} element={<Login/>} />
                <Route path={PATH.REGISTRATION} element={<Registration/>} />
                <Route path={PATH.PROFILE} element={<Profile/>} />
                <Route path={PATH.RECOVERY_PASS} element={<RecoveryPass/>} />
                <Route path={PATH.NEW_PASS + "/:token"} element={<NewPass/>} />
                <Route path={PATH.SEND_MAIL} element={<SendMail/>} />

                <Route path={PATH.TEST} element={<AllComponents/>} />

                <Route path="/" element={<Navigate to={PATH.PROFILE}/>}/>
                <Route path={PATH.PACK_LIST} element={<PackList/>} />
                <Route path={PATH.CARDS_LIST + ":cardPackID"} element={<CardsList/>}/>
                <Route path={PATH.CARD_LEARNING + ":cardPackID"} element={<CardLearning/>}/>
                <Route path={PATH.ERROR404} element={<PageNotFound/>} />
                <Route path="*" element={<Navigate to={PATH.ERROR404}/>}/>
            </Routes>
        </div>
    )
}
