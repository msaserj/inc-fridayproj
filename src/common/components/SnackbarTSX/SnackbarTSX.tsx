import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setAppErrorAC} from "../../../App/app-reducer";
import {Alert, Snackbar, SnackbarContent, Stack} from "@mui/material";


export const SnackbarTSX = () => {
	const error = useAppSelector<null | string>(state => state.app.appError);
	const userName = useAppSelector(state => state.auth.user.name)
	const dispatch = useAppDispatch();
	useEffect(() => {
		const timeout_ID = setTimeout(() => {
			dispatch(setAppErrorAC(null));
		}, 3000);
		return () => {
			clearTimeout(timeout_ID);
		}
	}, [dispatch, error, userName]);
	const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(true);

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSuccessSnackbar(false);
	};

	if(error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') {
		return null
	}

	if (error) {
		return <>
			<Snackbar open={true}>
				<SnackbarContent style={{backgroundColor: 'red'}}
								 message={<span id="client-snackbar">{error}</span>}
				/>
			</Snackbar>
		</>
	}

	return (
		<>
			{userName
				? (<Stack spacing={2} sx={{width: '100%'}}>
					<Snackbar open={openSuccessSnackbar} autoHideDuration={5000} onClose={handleClose}>
						<Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
							{userName} is login successfully!
						</Alert>
					</Snackbar>
				</Stack>)
				: <></>}
		</>
	)
};
