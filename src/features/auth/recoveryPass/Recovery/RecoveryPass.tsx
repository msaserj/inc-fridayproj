
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {useFormik} from "formik";
import {recoveryPswdThunkTC} from "../../auth-reducer";
import css from "./RecoveryPass.module.css";
import SuperInputText from "../../../../common/components/Primitive/c1-InputText/SuperInputText";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../../common/constants/Path";
import {RECOVERY_LINK} from "../../../../common/constants/constants";
import SuperButton from "../../../../common/components/Primitive/c2-Button/SuperButton";
import {useNavigate} from "react-router-dom";
import {getUserName} from "../../profile/profileSelectors";

type FormikErrorType = {
    email?: string
}

export const RecoveryPass = () => {
    const dispatch = useAppDispatch();
    const nickName = useAppSelector(getUserName)
    const message = "<p>Press <a href={RECOVERY_LINK}>link</a> for recovery password</p>"
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'required';
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'invalid email address';
            }
        },
        onSubmit: values => {
            dispatch(recoveryPswdThunkTC(values.email, nickName, message));
            formik.resetForm();
            formik.setTouched({});
            formik.setErrors({email: undefined});
            navigate(PATH.SEND_MAIL);
        },
    });
    const user_ID = useAppSelector(state => state.auth.user._id);
    if (user_ID) {
        return <Navigate to={PATH.PACK_LIST}/>
    }
    return <div className={css.mainBlock}>
        <div className={css.recoveryBlock}>
            <h2>Recovery Password</h2>
            <form onSubmit={formik.handleSubmit} className={css.form}>
                <div className={css.email}>
                    <SuperInputText
                        id="standard-basic"
                        type="email" {...formik.getFieldProps('email')}
                        className={css.superInputText}
                        error={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
                        placeholder={"enter email"}/>
                </div>
                <div className={css.infoSpan}>
                    <span >Enter your email address and we will send you further instructions </span>
                </div>

                <SuperButton type={'submit'} className={css.submit_button}
                             disabled={!(formik.isValid && formik.dirty)}>Send</SuperButton>
            </form>
            <span className={css.passQuestion}>Did you remember your password?</span>
            <div className={css.tryLoggin}>
                <NavLink
                    to={PATH.LOGIN}
                >Try logging in</NavLink>
            </div>
        </div>

    </div>
}