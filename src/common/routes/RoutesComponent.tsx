import {Route, Routes} from "react-router-dom";
import {PATH} from "../constants/Path";
import {Login} from "../../features/auth/login/Login";
import {Registration} from "../../features/auth/registration/Registration";
import {Profile} from "../../features/profile/Profile";
import {RecoveryPass} from "../../features/recoveryPass/RecoveryPass";
import {NewPass} from "../../features/auth/newPass/NewPass";
import {PageNotFound} from "../components/error404/Error404";
import {AllComponents} from "../components/AllComponents";
import React from "react";

export const RoutesComponent = () => {
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
            </Routes>
        </div>
    )
}
