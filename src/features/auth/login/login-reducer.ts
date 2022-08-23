//заглушка редьюсера. Не стал делать для всех такую же

import {Dispatch} from "redux";


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
