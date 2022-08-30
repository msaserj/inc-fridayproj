import axios, {AxiosError} from "axios";
import {setAppErrorAC} from "../../App/app-reducer";
import {Dispatch} from "redux";

export const handleAppRequestError = (error: Error | AxiosError, dispatch: Dispatch) => {
	let errorMessage = axios.isAxiosError(error)
		? (error.response?.data as { error: string }).error
		: error.message + ', more details in the console';

	console.log('Error: ', errorMessage);
	dispatch(setAppErrorAC(errorMessage));
};
