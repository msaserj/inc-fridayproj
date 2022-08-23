import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {initializeAppTC, setAppErrorAC} from "../../../App/app-reducer";
import {Alert, Snackbar, SnackbarContent, Stack} from "@mui/material";
import {setAuthDataAC} from "../../profile/profile-reducer";


export const SnackbarTSX = () => {
	const error = useAppSelector<null | string>(state => state.app.appError);
	const userName = useAppSelector(state => state.profile.user.name)
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log(`user.name in useEffect`, userName)
		console.log(`user in useEffect`, userName)
		const timeout_ID = setTimeout(() => {
			dispatch(setAppErrorAC(null));
			//dispatch(setAuthDataAC(user))
		}, 3000);
		return () => {
			clearTimeout(timeout_ID);
		}
	}, [dispatch, error, userName]);


	const [openSucces, setOpenSucces] = useState(true);
	// if(error){setOpenSucces(false)}

	const handleClick = () => {
		setOpenSucces(true);
	};

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSucces(false);
	};

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
				?(<Stack spacing={2} sx={{width: '100%'}}>

					<Snackbar open={openSucces} autoHideDuration={5000} onClose={handleClose}>
						<Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
							{userName} is login successfully!
						</Alert>
					</Snackbar>
				</Stack>)
				:<></>}
		</>
	)


};
