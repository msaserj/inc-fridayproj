import {AppThunkType} from "../../../App/store";
import {registrationApi} from "./registration-api";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../common/constants/Path";
import React from "react";
import {setAppErrorAC, setAppIsInitializedAC, setAppIsLoadingAC} from "../../../App/app-reducer";


type InitStateType = typeof initState;

const initState = {
    successfulRegistration: false
};

type SetRegistrationType = ReturnType<typeof registrationAC>;

export type RegistrationActionsType = SetRegistrationType;


export const registrationReducer = (state: InitStateType = initState, action: RegistrationActionsType): InitStateType => {
    switch (action.type) {
        case "registration/SET-REGISTRATION":
            return {...state, successfulRegistration: action.condition}
        default:
            return state;
    }
};


export const registrationAC = (condition: boolean) => ({type: "registration/SET-REGISTRATION", condition} as const);

// sanki
export const registrationThunkTC = (email: string, password: string): AppThunkType => (dispatch) => {

    dispatch(setAppIsLoadingAC(true))
    registrationApi.registration(email, password)
        .then(res => {
            dispatch(registrationAC(true))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');

            console.log(error)

            dispatch(setAppErrorAC(error));
        })
        .finally(() => {

            dispatch(setAppIsLoadingAC(false))
        })
};



