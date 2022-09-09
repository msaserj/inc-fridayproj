import React from "react";
import {useAppDispatch} from "../../../common/hooks/hooks";
import {useFormik} from "formik";
import {newPswdThunkTC} from "../auth-reducer";
import css from "./NewPass.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../../common/constants/Path";
import SuperButton from "../../../common/components/c2-Button/SuperButton";
import SuperPasswordInput from "../../../common/components/c1-InputText/PasswordInpit/SuperPasswordInput";

type FormikErrorType = {
    password?: string
}

export const NewPass = () => {
    const params = useParams<'token'>()
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const resetPasswordToken = params.token
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'required'
            } else if (values.password.trim().length < 5) {
                errors.password = "min 5 symbols"
            }
            return errors;
        },
        onSubmit: values => {
            if(resetPasswordToken) dispatch(newPswdThunkTC(values.password, resetPasswordToken));
            formik.resetForm();
            formik.setTouched({});
            formik.setErrors({password: undefined});
            navigate(PATH.PROFILE);
        },
    });
    return <div className={css.mainBlock}>

        <div className={css.recoveryBlock}>
            <h2>Create new password</h2>
            <form onSubmit={formik.handleSubmit} className={css.form}>
                <div className={css.password}>
                    <SuperPasswordInput
                        autoComplete={''}
                        id="standard-basic"
                        type="password" {...formik.getFieldProps('password')}
                        className={css.superInputText}
                        error={formik.errors.password && formik.touched.password ? formik.errors.password : ''}
                        placeholder={"enter new password"}/>
                </div>
                <div className={css.infoSpan}>
                    <span >Create new password and we will send you further instructions to email</span>
                </div>

                <SuperButton type={'submit'} className={css.submit_button}
                             disabled={!(formik.isValid && formik.dirty)}>Create new password</SuperButton>
            </form>
        </div>
    </div>
}