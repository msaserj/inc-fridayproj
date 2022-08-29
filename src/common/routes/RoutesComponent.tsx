import {Route, Routes} from "react-router-dom";
import {PATH} from "../constants/Path";
import {Login} from "../../features/auth/login/Login";
import {Registration} from "../../features/auth/registration/Registration";
import {Profile} from "../../features/auth/profile/Profile";
import {RecoveryPass} from "../../features/auth/recoveryPass/RecoveryPass";
import {NewPass} from "../../features/auth/newPass/NewPass";
import {PageNotFound} from "../components/error404/Error404";
import {AllComponents} from "../components/AllComponents";
import React from "react";
import {useAppSelector} from "../hooks/hooks";
import {DotedLoader} from "../components/c8-Loaders/DotedLoader/DotedLoader";
import {Navigate} from "react-router-dom";

export const RoutesComponent = () => {
    const initialized = useAppSelector<boolean>(state => state.app.appIsInitialized)
    const isLoading = useAppSelector<boolean>(state => state.app.appIsLoading)

    if (!initialized) {
        return(
            <div style={{position: "fixed", top: "50%", width: "100%"}}>
                <DotedLoader large />
            </div>
        )
    }

    if (isLoading) {
        return(
            <div style={{position: "fixed", top: "50%", width: "100%"}}>
                <DotedLoader large />
            </div>
        )
    }

    return (
        <div>
            <Routes>
                <Route path={PATH.LOGIN} element={<Login/>} />
                <Route path={PATH.REGISTRATION} element={<Registration/>} />
                <Route path={PATH.PROFILE} element={<Profile/>} />
                <Route path={PATH.RECOVERY_PASS} element={<RecoveryPass/>} />
                <Route path={PATH.NEW_PASS} element={<NewPass/>} />
                <Route path={PATH.ERROR404} element={<PageNotFound/>} />
                <Route path={PATH.TEST} element={<AllComponents/>} />
                <Route path="*" element={<Navigate to={PATH.ERROR404}/>}/>
                <Route path="/it-inc-fridayproj" element={<Navigate to={PATH.PROFILE}/>}/>
            </Routes>
        </div>
    )
}
