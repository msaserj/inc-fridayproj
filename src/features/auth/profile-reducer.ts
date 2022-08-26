import {ProfileApi, UserType} from "./profile-api";
import {AppThunkType} from "../../App/store";
import {setAppErrorAC, setAppIsLoadingAC} from "../../App/app-reducer";
import {authApi} from "./login-api";

type InitStateType = typeof initState;
type SetAuthDataActionType = ReturnType<typeof setAuthDataAC> | ReturnType<typeof loadingStatusAC>;
export type ProfileActionsType = SetAuthDataActionType;

// Initial state
const initState = {
    loading: false,
    user: {} as UserType,
};

// Action creators
export const setAuthDataAC = (user: UserType) => ({type: "profile/SET-AUTH-DATA", user} as const);
export const loadingStatusAC = (value: boolean) => ({type: "profile/LOADING-STATUS", value} as const);

// Thunk creators
export const profileReducer = (state: InitStateType = initState, action: ProfileActionsType): InitStateType => {
    switch (action.type) {
        case "profile/SET-AUTH-DATA":
            console.log(27, action.user.name)
            return {...state, user: action.user};
        case "profile/LOADING-STATUS":
            return {...state, loading: action.value}
        default:
            return state;
    }
};

// sanki
export const updateUserDataTC = (name: string): AppThunkType => (dispatch) => {

    dispatch(setAppIsLoadingAC(true))
    ProfileApi.updateUserData(name)
        .then(res => {
            console.log(50, res)

            // dispatch(setAuthDataAC(res)); !!!!!!!!!!!!!!

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
