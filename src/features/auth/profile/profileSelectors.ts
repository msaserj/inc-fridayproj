import {AppRootStateType} from "../../../App/store";

// primitive selector

export const getUserId = (state: AppRootStateType): string => state.auth.user._id;
export const getUserName = (state: AppRootStateType): string => state.auth.user.name;
export const getUserEmail = (state: AppRootStateType): string => state.auth.user.email;
export const getAvatar = (state: AppRootStateType): string | undefined => state.auth.user.avatar;




// super selector
// export const getUsersSuperSelector = createSelector(getUser, (cards)=>{
//     // return cards.filter(e=> true)
// })