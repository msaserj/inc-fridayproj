import React from 'react';
import SuperButton from "../../../common/components/Primitive/c2-Button/SuperButton";
import {PATH} from "../../../common/constants/Path";
import {useAppDispatch} from "../../../common/hooks/hooks";
import {NavLink} from "react-router-dom";
import css from './Login.module.css';
import {useFormik} from "formik";
import SuperInputText from "../../../common/components/Primitive/c1-InputText/SuperInputText";
import SuperCheckbox from "../../../common/components/Primitive/c3-Checkbox/SuperCheckbox";
import {loginThunkTC} from "../auth-reducer";
import SuperPasswordInput from "../../../common/components/Primitive/c1-InputText/PasswordInpit/SuperPasswordInput";


type FormikErrorType = {
	email?: string
	password?: string
	rememberMe?: boolean
}

export const LoginForm = () => {
	const dispatch = useAppDispatch();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		validate: (values) => {
			const errors: FormikErrorType = {};
			if (!values.email) {
				errors.email = 'required';
			} else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'invalid email address';
			}
			if (!values.password) {
				errors.password = 'required'
			} else if (values.password.trim().length < 5) {
				errors.password = "min 5 symbols"
			}
			return errors;
		},
		onSubmit: values => {
			dispatch(loginThunkTC(values.email, values.password, values.rememberMe));
			formik.resetForm();
			formik.setTouched({});
			formik.setErrors({email: undefined, password: undefined, rememberMe: undefined});
		},
	});
	return (
		<>
			<form onSubmit={formik.handleSubmit} className={css.form}>
				<div className={css.email}>
					<SuperInputText
						id="standard-basic"
						type="email" {...formik.getFieldProps('email')}
						className={css.superInputText}
						error={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
						placeholder={"enter email"}/>
				</div>
				<div className={css.password}>
					<SuperPasswordInput
						id="standard-basic"
						type="password" {...formik.getFieldProps('password')}
						className={css.superInputText}
						error={formik.errors.password && formik.touched.password ? formik.errors.password : ''}
						placeholder={"enter password"}/>
				</div>
				<div className={css.superCheckbox}>
					<SuperCheckbox
								   {...formik.getFieldProps('rememberMe')}>Remember me
					</SuperCheckbox>
				</div>
					<NavLink className={css.forgot_password} to={PATH.RECOVERY_PASS}>
						Forgot Password?
					</NavLink>

				<SuperButton type={'submit'} className={css.submit_button}
							 disabled={!(formik.isValid && formik.dirty)}>Login</SuperButton>
			</form>
			<span className={css.signUpLabel}>Don’t have an account?</span>
			<div className={css.sign_up}>
				<NavLink
					to={PATH.REGISTRATION}
				>Sign Up</NavLink>
			</div>
		</>
	)
}


