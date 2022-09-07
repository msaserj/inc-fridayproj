import React from "react";
import css from "./CardLearning.module.css"
import {BackToPackList} from "../../common/components/BackToPackList/BackToPackList";
import {useAppSelector} from "../../common/hooks/hooks";
import {useParams} from "react-router-dom";


export const CardLearning = () => {
    const urlParams = useParams<"cardPackID">();
    const cardPack_ID = urlParams.cardPackID;

    const packName = useAppSelector<string>(state => state.cardsList.packName)

    return (
        <div>
            <div className={css.mainBlock}>
                <BackToPackList/>

                {/*<div>*/}
                    <div className={css.headPackName}><h3>Name Pack: {packName}</h3></div>
                {/*</div>*/}

                <div className={css.personalInfo}>
                    <h2>BlaBlaBla</h2>
                </div>
            </div>
        </div>
    )
}
