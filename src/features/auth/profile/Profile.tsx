import React, {useState} from "react";
import css from './Profile.module.css'
import photoIcon from '../../../assets/img/photoIcon.svg'
import SuperButton from "../../../common/components/Primitive/c2-Button/SuperButton";
import SuperEditableSpan from "../../../common/components/Primitive/c4-EditableSpan/SuperEditableSpan";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {logoutThunkTC, updateUserDataTC} from "../auth-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../common/constants/Path";
import {BackToPackList} from "../../../common/components/BackToPackList/BackToPackList";
import {SuperSmallButton} from "../../../common/components/Primitive/SmallButtons/SuperSmallButton/SuperSmallButton";
import {getAvatar, getUserEmail, getUserId, getUserName} from "./profileSelectors";
import {RANDOM_AVA} from "../../../common/constants/constants";
import {getIsLoadingApp} from "../../../App/appSelectors";


export const Profile = () => {
    const dispatch = useAppDispatch();

    const avatar = useAppSelector(getAvatar)
    const name = useAppSelector(getUserName)
    const email = useAppSelector(getUserEmail)
    const isFetching = useAppSelector(getIsLoadingApp)
    const isLoggedIn = useAppSelector(getUserId)

    const [editModeUp, setEditModeUp] = useState<boolean>(false)
    const [value, setValue] = useState<string>(name ? name : 'Random Ava')

    function LogoutHandler() {
        dispatch(logoutThunkTC())
        setValue('Random Ava')
    }

    function onKeyPressInputHandle(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === `Enter`) {
            dispatch(updateUserDataTC(value))
            setEditModeUp(false)
        }
    }

    const switchEditMode = () => {
        if (!editModeUp) {
            setEditModeUp(true)
        } else {
            dispatch(updateUserDataTC(value))
            setEditModeUp(false)
        }
    }
    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div>
            <div className={css.mainBlock}>
                {/*Back to packs List*/}
                <BackToPackList/>
                {/*Personal information*/}
                <div className={css.personalInfo}>
                    <h3>Personal Information</h3>
                    <div className={css.profilePhotoBlock}>
                        <img className={css.profilePhoto} src={avatar ? avatar : RANDOM_AVA} alt="avatar"/>
                        <img className={css.photoIcon} src={photoIcon} alt="photoIcon"/>
                    </div>
                    <div className={css.profileName}>
                        <SuperEditableSpan
                            placeholder={"nickname"}
                            className={css.input}
                            editModeUp={editModeUp}
                            value={value}
                            onChangeText={setValue}
                            onKeyPress={onKeyPressInputHandle}
                            spanProps={{children: value}}
                        />
                        <SuperSmallButton disabled={isFetching} style={{padding: "2px", marginTop: "10px"}} edit={!editModeUp} save={editModeUp} onClick={switchEditMode}/>
                    </div>
                    {email
                        ? (<p className={css.email}>{email}</p>)
                        : <><p className={css.email}>serg.ks@gmail.com</p></>
                    }
                    <SuperButton onClick={LogoutHandler}>Log out</SuperButton>
                </div>
            </div>
        </div>
    )
}
