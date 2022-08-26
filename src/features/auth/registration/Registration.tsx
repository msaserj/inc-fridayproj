import {RegistrationForm} from "./RegistrationForm";
import {FormLabel} from "@mui/material";
import React from "react";
import {useAppSelector} from "../../../common/hooks/hooks";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../common/constants/Path";

export const Registration = () => {

    const error = useAppSelector(state => state.app.appError);
    const user_ID = useAppSelector(state => state.auth.user._id);

    if (user_ID) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return <div>
        <FormLabel>
        </FormLabel>
        <RegistrationForm/>
        {error && <div style={{color: "red"}}>{error}</div>}
    </div>
}



