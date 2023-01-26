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


export const Profile = () => {
    const dispatch = useAppDispatch();

    const {avatar} = useAppSelector(state => state.auth.user)
    const {name} = useAppSelector(state => state.auth.user)
    const {email} = useAppSelector(state => state.auth.user)
    const isFetching = useAppSelector(state => state.app.appIsLoading)

    const isLoggedIn = useAppSelector(state => state.auth.user._id)
    const randomAva = "https://thispersondoesnotexist.com/image"

    const [editModeUp, setEditModeUp] = useState<boolean>(false)
    const [value, setValue] = useState<string>(name ? name : 'Somebody')

    function LogoutHandler() {
        dispatch(logoutThunkTC())
        setValue('Somebody')
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
                        <img className={css.profilePhoto} src={avatar ? avatar : randomAva} alt="avatar"/>
                        <img className={css.photoIcon} src={photoIcon} alt="photoIcon"/>
                    </div>
                    <div className={css.profileName}>
                        <SuperEditableSpan
                            placeholder={"nickname"}
                            className={css.input}
                            editModeUp={editModeUp}
                            // value={value}
                            value={value}
                            onChangeText={setValue}
                            onKeyPress={onKeyPressInputHandle}
                            // spanProps={{children: value ? undefined : 'Vasya Pupkina'}}
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
