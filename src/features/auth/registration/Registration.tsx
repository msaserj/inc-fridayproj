import {RegistrationForm} from "./RegistrationForm";
import React, {useEffect} from "react";
import {useAppSelector} from "../../../common/hooks/hooks";
import {useNavigate} from "react-router-dom";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../common/constants/Path";

export const Registration = () => {

	const error = useAppSelector(state => state.app.appError);
	const user_ID = useAppSelector(state => state.auth.user._id);


	if (user_ID) {
	    return <Navigate to={PATH.PROFILE}/>
	}

	return <div>
		<RegistrationForm/>
		{error && <div style={{color: "red"}}>{error}</div>}
	</div>
}



