import React, {useState} from "react";
import css from "./CardLearning.module.css"
import {BackToPackList} from "../../common/components/BackToPackList/BackToPackList";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {Navigate, useParams} from "react-router-dom";
import {DotedLoader} from "../../common/components/c8-Loaders/DotedLoader/DotedLoader";
import SuperButton from "../../common/components/c2-Button/SuperButton";
import {PATH} from "../../common/constants/Path";
import {getRandomCardTC, gradeCardTC} from "../cardList/cardList-reducer";
import SuperRadio from "../../common/components/c6-Radio/SuperRadio";


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
    const arr = [
        { id: 1, value: 'не знаю' },
        { id: 2, value: 'что-то помню' },
        { id: 3, value: 'вроде помню' },
        { id: 4, value: 'хорошо помню' },
        { id: 5, value: 'знаю' },
    ]


    return (isFetching ?
            <div><DotedLoader large/></div> :
            <div>
                <div className={css.mainBlock}>
                    <BackToPackList/>

                    {/*<div>*/}
                    <div className={css.headPackName}><h3>{packName}</h3></div>
                    {/*</div>*/}

                    <div className={css.personalInfo}>
                        <h3> Question: </h3>
                        <span>{randomCard.question}</span>
                        {showAnswer && <div>
                            <p>{randomCard.answer}</p>

                            <SuperRadio
                                disabled={loadingModal}
                                id={'hw7-super-radio'}
                                name={'hw7-radio'}
                                options={arr}
                                value={rate}
                                onChangeOption={(rate) => {
                                    setRate(rate)
                                    dispatch(gradeCardTC(rate))

                                }}
                            />
                        </div>}
                        <p>Number of answers per question:{randomCard.shots}</p>
                        <div style={{ position: "absolute", bottom: "50px"}}>
                            <SuperButton disabled={loadingModal || showAnswer} onClick={() => setShowAnswer(true)}>Show answer</SuperButton>
                            <SuperButton disabled={loadingModal} onClick={onNext}>Next
                                question</SuperButton>
                        </div>

                    </div>
                </div>
            </div>
    )
}
