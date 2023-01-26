import {useFormik} from "formik";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../../common/constants/Path";
import {registrationThunkTC} from "../auth-reducer";
import SuperInputText from "../../../common/components/Primitive/c1-InputText/SuperInputText";
import SuperPasswordInput from "../../../common/components/Primitive/c1-InputText/PasswordInpit/SuperPasswordInput";
import SuperButton from "../../../common/components/Primitive/c2-Button/SuperButton";
import css from "./Registration.module.css"

type ErrorFormikType = {
    password?: string
    confirmPassword?: string
    email?: string
    value?: string
    description?: string
}

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const registration = useAppSelector<boolean>(state => state.auth.successfulRegistration);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: "",
        },
        validate: (values) => {
            const errors: ErrorFormikType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'required'
            } else if (values.password.trim().length < 7) {
                errors.password = "min 7 symbols"
            }
            if (values.password !== values.confirmPassword) {
                errors.password = "not equal passwords"
            }
            return errors
        },
        onSubmit: values => {
            formik.resetForm();
            dispatch(registrationThunkTC(values.email, values.password));
            onCancelButtonClick();
        },
    })
    const onCancelButtonClick = () => {
        formik.resetForm();
        formik.setTouched({});
        formik.setErrors({email: undefined, password: undefined});
    };
    useEffect(()=>{
        if (registration) {
            navigate(PATH.LOGIN)
        }
    },[])
    return <div>
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
                    <SuperPasswordInput
                        id="standard-basic"
                        type="password" {...formik.getFieldProps('confirmPassword')}
                        className={css.superInputText}
                        error={formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
                        placeholder={"enter password"}/>
                </div>
                <SuperButton type={'submit'} className={css.submit_button}
                             disabled={!(formik.isValid && formik.dirty)}>Register</SuperButton>
                <div className={css.regQuestion}>
                    <NavLink to={PATH.LOGIN}>
                        Already have an account?
                    </NavLink>
                </div>
            </form>
    </div>
}
