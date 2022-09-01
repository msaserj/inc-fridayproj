import {RegistrationForm} from "./RegistrationForm";
import React from "react";
import {useAppSelector} from "../../../common/hooks/hooks";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../common/constants/Path";
import css from "./Registration.module.css"

export const Registration = () => {
	const error = useAppSelector(state => state.app.appError);
	const user_ID = useAppSelector(state => state.auth.user._id);
	if (user_ID) {
	    return <Navigate to={PATH.PACK_LIST}/>
	}

	return <div className={css.mainBlock}>
		<div className={css.regBlock}>
			<h2>Registration</h2>
			<RegistrationForm/>
		</div>
		{error && <div style={{color: "red"}}>{error}</div>}
	</div>
}



