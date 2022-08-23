//заглушка редьюсера. Не стал делать для всех такую же

import {Dispatch} from "redux";
import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})


// ActionCreators
export const SomeAC = (value: boolean) => ({type: 'TYPE', value} as const)

// reducers
const initialState: InitialStateType = {
    value: false
}
export const authReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case 'TYPE':
            return state
        default:
            return state
    }
}

// sanki
export const loginTC = (params: any) => (dispatch: ThunkDispatchType) => {

}

// types
export type LoginActionsType = ReturnType<typeof SomeAC>

type InitialStateType = {
    value: boolean
}

type ThunkDispatchType = Dispatch<LoginActionsType>
