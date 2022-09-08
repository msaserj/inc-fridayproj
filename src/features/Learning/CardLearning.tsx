import React, {useState} from "react";
import css from "./CardLearning.module.css"
import {BackToPackList} from "../../common/components/BackToPackList/BackToPackList";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {Navigate, useParams} from "react-router-dom";
import {DotedLoader} from "../../common/components/c8-Loaders/DotedLoader/DotedLoader";
import SuperButton from "../../common/components/c2-Button/SuperButton";
import {PATH} from "../../common/constants/Path";
import {StarRating} from "../../common/components/StarRating/StarRating";
import {getRandomCardTC, gradeCardTC} from "../cardList/cardList-reducer";


export const CardLearning = () => {
    const urlParams = useParams<"cardPackID">();
    const dispatch = useAppDispatch()
     const cardPack_ID = urlParams.cardPackID;
    const loadingModal = useAppSelector(state => state.cardsList.loadingModal)
    const packName = useAppSelector<string>(state => state.cardsList.packName)
    const randomCard = useAppSelector<any>(state => state.cardsList.randomCard)
    const isFetching = useAppSelector<boolean>(state => state.app.appIsLoading)
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [rate, setRate] = useState(0)

    const onNext = () => {
         // @ts-ignore
        dispatch(getRandomCardTC({cardsPack_id: cardPack_ID}))
        setShowAnswer(false);
    }

    if (!packName) {
        return <Navigate to={PATH.PACK_LIST}/>
    }


    return (isFetching ?
            <div><DotedLoader large/></div> :
            <div>
                <div className={css.mainBlock}>
                    <BackToPackList/>

                    {/*<div>*/}
                    <div className={css.headPackName}><h3>{packName}</h3></div>
                    {/*</div>*/}

                    <div className={css.personalInfo}>
                        <h1> Question: {randomCard.question}</h1>
                        <h2>Number of answers per question:{randomCard.shots}</h2>
                        {showAnswer && <div>
                            <p>{randomCard.answer}</p>
                            <StarRating edit={true} value={rate} size={20} onClick={(rate) => {
                                setRate(rate)
                                dispatch(gradeCardTC(rate))
                            }}/>
                        </div>}
                        <SuperButton disabled={loadingModal || showAnswer} onClick={() => setShowAnswer(true)}>Show answer</SuperButton>
                        <SuperButton disabled={loadingModal} onClick={onNext}>Next
                            question</SuperButton>
                    </div>
                </div>
            </div>
    )
}
