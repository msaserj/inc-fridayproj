import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../features/header/Header";
import {RoutesComponent} from "../common/routes/RoutesComponent";
import {SnackbarTSX} from "../common/components/SnackbarTSX/SnackbarTSX";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {initializeAppTC} from "./app-reducer";
import {getIsLoggedIn} from "./appSelectors";

const App = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(getIsLoggedIn)

    useEffect(() => {
        if(!isLoggedIn) {
            dispatch(initializeAppTC())
        }
    }, [dispatch, isLoggedIn])

    return (
        <div className="App">
            <Header/>
            <div>
                <RoutesComponent/>
                {/*<Body titleForBody={"New Body"}/>*/}
            </div>
            <SnackbarTSX/>
        </div>
    );
}

export default App;
