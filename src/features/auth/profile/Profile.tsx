import React, {useState} from "react";
import css from './Profile.module.css'
import arrow from '../../../assets/img/arrow.svg'
import pencil from '../../../assets/img/pencil.svg'
import photoIcon from '../../../assets/img/photoIcon.svg'
import SuperButton from "../../../common/components/c2-Button/SuperButton";
import SuperEditableSpan from "../../../common/components/c4-EditableSpan/SuperEditableSpan";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {logoutThunkTC, updateUserDataTC} from "../auth-reducer";


export const Profile = () => {


	//добавил для отрисовки юзера:
	const {avatar, name, email} = useAppSelector(state => state.auth.user)
	// const {user} = useAppSelector(state => state.auth)

	const dispatch = useAppDispatch();

	const [value, setValue] = useState<string>(name ? name : 'Somebody')

	// console.log(`user in Profile`, user)
	console.log(`userName in Profile`, name)

	function LogoutHandler() {
		dispatch(logoutThunkTC())
		setValue('Somebody')
	}

	function onCLickButtonHandle() {
		dispatch(updateUserDataTC(value))
	}

	function onKeyPressInputHandle(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === `Enter`) {
			onCLickButtonHandle()
		}
	}

	return (
		<div>

			<div className={css.mainBlock}>
				{/*Back to packs List*/}
				<div className={css.backToBlock}>
					<img src={arrow} alt="arrow"/>
					<p>Back to packs List</p>
				</div>
				{/*Personal information*/}
				<div className={css.personalInfo}>
					<h3>Personal Information</h3>
					<div className={css.profilePhotoBlock}>

						{/*<img className={css.profilePhoto} src="https://thispersondoesnotexist.com/image" alt="avatar"/>*/}

						{/*поменял отображение avatar в зависимости от того залогинился ли user: */}
						{name
							? (<img className={css.profilePhoto} src={avatar} alt="avatar from Back-end"/>)
							: <><img className={css.profilePhoto} src="https://thispersondoesnotexist.com/image"
									 alt="avatar Random"/></>
						}

						<img className={css.photoIcon} src={photoIcon} alt="photoIcon"/>
					</div>
					<div className={css.profileName}>
						<SuperEditableSpan
							placeholder={"nickname"}
							className={css.input}
							// value={value}
							value={value}
							onChangeText={setValue}
							onKeyPress={onKeyPressInputHandle}
							// spanProps={{children: value ? undefined : 'Vasya Pupkina'}}
							spanProps={{children: value}}
						/><img src={pencil} alt="pencil"/>
					</div>
					{/*<p className={css.email}>serg.ks@gmail.com</p>*/}

					{email
						? (<p className={css.email}>{email}</p>)
						: <><p className={css.email}>serg.ks@gmail.com</p></>
					}

					{/*<SuperButton onClick={X => X}>Log out</SuperButton>*/}
					<SuperButton onClick={LogoutHandler}>Log out</SuperButton>
				</div>

			</div>

		</div>
	)
}
