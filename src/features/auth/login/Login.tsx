import {Navigate} from "react-router-dom";
import {PATH} from "../../../common/constants/Path";
import {useAppSelector} from "../../../common/hooks/hooks";
import {LoginForm} from "./LoginForm";
import css from "./Login.module.css";


export const Login = () => {
	const user_ID = useAppSelector(state => state.auth.user._id);
	if (user_ID) {
		return <Navigate to={PATH.PACK_LIST}/>
	}
	return (
		<div className={css.mainBlock}>
			 {/*<img src={IT_Incubator} alt="IT_Incubator"/>*/}
			<div className={css.loginBlock}>
				<h2>Sign In</h2>
				<LoginForm/>
			</div>
		</div>
	)
}

