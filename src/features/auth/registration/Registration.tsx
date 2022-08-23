import {useFormik} from "formik";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@mui/material";



type ErrorFormikType = {
    password?: string
    confirmPassword?: string
    email?: string
    value?: string
    description?: string
}

export const Registration = () => {


    // const dispatch = useDispatch()

    //const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    const formik = useFormik({
        validate: (values) => {
            const errors: ErrorFormikType = {}
            if (!values.email) {
                errors.email = 'email is required';
            } else if (!/^[A-Z/d._%+-]+@[A-Z/d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = "password is required"
            } else if (!values.confirmPassword) {
                errors.confirmPassword = "password is required"
            } else if (values.password.length < 8) {
                errors.password = "min length 8 symbols"
            } else if (values.confirmPassword.length < 8) {
                errors.confirmPassword = "min length 8 symbols"
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = "confirm your password currently"
            }
            if (values.password != values.confirmPassword) {
                errors.password = "passwords must be high"
            }
            return errors
        },
        initialValues: {
            email: '',
            password: '',
            confirmPassword: "",
            rememberMe: false
        },
        onSubmit: values => {

            console.log(values)
            //dispatch(loginTC(values));
        },
    })

    /*   if (isLoggedIn) {
          /// return <Redirect to={"/"} />
       }*/


    return <div>
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>
                            or use common test account credentials:
                        </p>
                        <p> Email: free@samuraijs.com
                        </p>
                        <p>
                            Password: free
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <TextField
                            type="password"
                            label="Confirm password"
                            margin="normal"
                            {...formik.getFieldProps("confirmPassword")}
                        />
                        {formik.errors.password ? <div>{formik.errors.confirmPassword}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <div>
                            <Button type={'submit'} variant={'contained'} color={'primary'} >Register</Button>
                            <Button variant={'contained'} >Cansel</Button>
                        </div>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </div>
}



