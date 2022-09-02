import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../features/header/Header";
import {HashRouter} from "react-router-dom";
import {RoutesComponent} from "../common/routes/RoutesComponent";
import {SnackbarTSX} from "../common/components/SnackbarTSX/SnackbarTSX";
import {useAppDispatch} from "../common/hooks/hooks";
import {initializeAppTC} from "./app-reducer";

const App = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    return (
        <div className="App">
            <HashRouter>
                <Header titleForHeader={"Header"}/>
                <div>
                    <RoutesComponent/>
                    {/*<Body titleForBody={"New Body"}/>*/}
                </div>
                <SnackbarTSX/>
            </HashRouter>
        </div>
    );
}

export default App;
