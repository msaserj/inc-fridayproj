import React, {useState} from 'react';
import SuperButton from "../../../common/components/c2-Button/SuperButton";
import {PATH} from "../../../common/constants/Path";
import {useAppDispatch} from "../../../common/hooks/hooks";
import {NavLink} from "react-router-dom";
import s from './Login.module.css';
import {useFormik} from "formik";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import SuperInputText from "../../../common/components/c1-InputText/SuperInputText";
import SuperCheckbox from "../../../common/components/c3-Checkbox/SuperCheckbox";
import {loginThunkTC} from "../auth-reducer";


type FormikErrorType = {
	email?: string
	password?: string
	rememberMe?: boolean
}

export const LoginForm = () => {

	const [values, setValues] = useState({showPassword: false, showSnackBar: false});

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
				errors.email = 'Required';
			} else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}
			if (!values.password) {
				errors.password = 'Required'
			} else if (values.password.trim().length < 3) {
				errors.password = "Min 3 symbols"
			}
			return errors;
		},

		onSubmit: values => {
			dispatch(loginThunkTC(values.email, values.password, values.rememberMe));
		},
	});


	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<div className={s.email}>

					{/*<TextField id="standard-basic" label="Email" variant="standard"*/}
					{/*		   type="email" {...formik.getFieldProps('email')}/>*/}

					{/*заменил TextField из MaterialUI на SuperInputText:*/}
					<SuperInputText
						id="standard-basic"
						type="email" {...formik.getFieldProps('email')}
						className={s.superInputText}
					/>
					{formik.errors.email && formik.touched.email &&
                        <div style={{color: "red"}}>{formik.errors.email}</div>}

				</div>

				<div>
					<FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={values.showPassword ? 'text' : 'password'}

							{...formik.getFieldProps('password')}

							endAdornment={
								<InputAdornment position="end" >
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										edge="end"
									>
										{values.showPassword ? <VisibilityOff/> : <Visibility/>}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
							autoComplete="on"
						/>
					</FormControl>

					{formik.errors.password && formik.touched.password &&
                        <div style={{color: "red"}}>{formik.errors.password}</div>}

				</div>
				{/*<Checkbox*/}
				{/*	{...formik.getFieldProps('rememberMe')}*/}
				{/*>{' '}</Checkbox>Remember me (from Material UI)*/}
				<div className={s.superCheckbox}>
					<SuperCheckbox
								   {...formik.getFieldProps('rememberMe')}>
						Remember me
					</SuperCheckbox>
				</div>

				<div className={s.forgot_password}>
					<NavLink to={PATH.RECOVERY_PASS}>
						Forgot Password?
					</NavLink>
				</div>
				<SuperButton type={'submit'} className={s.submit_button}
							 disabled={!(formik.isValid && formik.dirty)}>
					Login
				</SuperButton>
			</form>
			<span
				className={s.signUpLabel}>Don’t have an account?</span>
			<div className={s.sign_up}>
				<NavLink
					to={PATH.REGISTRATION}

				>Sign Up</NavLink>
			</div>

		</>
	)
}

