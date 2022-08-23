import {Navigate} from "react-router-dom";
import {PATH} from "../../../common/constants/Path";
import {useSelector} from "react-redux";
import {useAppSelector} from "../../../common/hooks/hooks";
import {LoginForm} from "./LoginForm";
import s from "./auth.module.css";

import IT_Incubator from '../../../assets/img/Group 753.svg'




export const Login = () => {

	const user_ID = useAppSelector(state => state.profile.user._id);

	if (user_ID) {
		return <Navigate to={PATH.PROFILE}/>
	}

	return (
		<div className={s.smallContainer}>
			 <img src={IT_Incubator} alt="IT_Incubator"/>
			<h2>Sign In</h2>
			<LoginForm/>
		</div>

	)


}

