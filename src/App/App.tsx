import React from 'react';
import './App.css';
import {Header} from "../features/header/Header";
import {BrowserRouter} from "react-router-dom";
import {RoutesComponent} from "../common/routes/RoutesComponent";


const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header titleForHeader={"Header"}/>
                <div>
                <RoutesComponent/>
                    {/*<Body titleForBody={"New Body"}/>*/}
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
