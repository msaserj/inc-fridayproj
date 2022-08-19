import React from 'react';
import './App.css';
import {Header} from "../features/header/Header";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {Login} from "../features/auth/login/Login";
import {PATH} from "../main/constants/Path";
import {Registration} from "../features/auth/registration/Registration";
import {Profile} from "../features/profile/Profile";
import {PageNotFound} from "../features/error404/Error404";
import {RecoveryPass} from "../features/recoveryPass/RecoveryPass";
import {NewPass} from "../features/auth/newPass/NewPass";
import {AllComponents} from "../components/AllComponents";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header titleForHeader={"Header"}/>
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
                    {/*<Body titleForBody={"New Body"}/>*/}
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
