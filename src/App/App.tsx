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
                    <h1>Тег h1</h1>
                </div>
                <h2>test h2</h2>
            </BrowserRouter>
        </div>
    );
}

export default App;
