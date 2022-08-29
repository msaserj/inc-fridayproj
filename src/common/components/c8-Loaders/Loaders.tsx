import React from 'react'
import {DotedLoader} from "./DotedLoader/DotedLoader";

export const Loaders = () => {

    return (
        <div>
            <h3>DotedLoaders</h3>
            <p>Options: <br/>
                default - 30px dots (not required!!!)<br/>
                small - 18px dots<br/>
                large - 60px dots</p>
                    <DotedLoader small/>
                    <DotedLoader />
                    <DotedLoader large/>
        </div>
    )
}
