import React, {useState} from "react";
import css from './Profile.module.css'
import arrow from '../../assets/img/arrow.svg'
import pencil from '../../assets/img/pencil.svg'
import photoIcon from '../../assets/img/photoIcon.svg'
import SuperButton from "../../common/components/c2-Button/SuperButton";
import SuperEditableSpan from "../../common/components/c4-EditableSpan/SuperEditableSpan";

export const Profile = () => {

    const [value, setValue] = useState<string>('')

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
                        <img className={css.profilePhoto} src="https://thispersondoesnotexist.com/image" alt="avatar"/>
                        <img className={css.photoIcon} src={photoIcon} alt="photoIcon"/>
                    </div>
                    <div className={css.profileName}>
                        <SuperEditableSpan
                            placeholder={"nickname"}
                            className={css.input}
                            value={value}
                            onChangeText={setValue}
                            spanProps={{children: value ? undefined : 'Vasya Pupkina'}}
                        /><img src={pencil} alt="pencil"/>
                    </div>
                    <p className={css.email}>serg.ks@gmail.com</p>
                    <SuperButton onClick={X => X}>Log out</SuperButton>
                </div>

            </div>

        </div>
    )
}