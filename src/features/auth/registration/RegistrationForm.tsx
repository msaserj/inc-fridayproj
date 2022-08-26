import {useFormik} from "formik";
import {
    Button,
    FormControl,
    FormGroup,
    Grid, IconButton, InputAdornment, InputLabel, OutlinedInput,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {useState} from "react";
import {useAppDispatch} from "../../../common/hooks/hooks";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../common/constants/Path";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../App/store";
import {registrationThunkTC} from "../auth-reducer";


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
    const registration = useSelector<AppStateType, boolean>(state => state.auth.successfulRegistration);

    const [values, setValues] = useState({showPassword: false, showSnackBar: false});

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    if (registration) {
        navigate(PATH.LOGIN)
    }


    const formik = useFormik({
        validate: (values) => {
            const errors: ErrorFormikType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.trim().length < 9) {
                errors.password = "Min 9 symbols"
            }
            if (values.password !== values.confirmPassword) {
                errors.password = "passwords must be high"
            }
            return errors
        },
        initialValues: {
            email: '',
            password: '',
            confirmPassword: "",
        },
        onSubmit: values => {
            console.log(values)
            formik.resetForm();
            dispatch(registrationThunkTC(values.email, values.password));
        },
    })

    const onCancelButtonClick = () => {
        formik.resetForm();
        formik.setTouched({});
        formik.setErrors({email: undefined, password: undefined});
        navigate(PATH.LOGIN);
    };


    return <div>
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <FormControl sx={{m: 1, width: '30ch'}} variant="outlined">
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps("email")}
                            />
                        </FormControl>
                        {formik.errors.email && formik.touched.email &&
                            <div style={{color: "red"}}>{formik.errors.email}</div>}

                        <FormControl sx={{m: 1, width: '30ch'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}

                                {...formik.getFieldProps('password')}

                                endAdornment={
                                    <InputAdornment position="end">
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
                            />
                        </FormControl>
                        {/* {formik.errors.password ? <div>{formik.errors.password}</div> : null}*/}
                        {formik.errors.password && formik.touched.password &&
                            <div style={{color: "red"}}>{formik.errors.password}</div>}
                        <FormControl sx={{m: 1, width: '30ch'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}

                                {...formik.getFieldProps('confirmPassword')}

                                endAdornment={
                                    <InputAdornment position="end">
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
                            />
                        </FormControl>
                        {/*  {formik.errors.password ? <div>{formik.errors.confirmPassword}</div> : null}*/}
                        {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                            <div style={{color: "red"}}>{formik.errors.confirmPassword}</div>}
                        <div>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Register</Button>
                            <Button variant={'contained'} onClick={onCancelButtonClick}>Cansel</Button>
                        </div>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </div>
}

