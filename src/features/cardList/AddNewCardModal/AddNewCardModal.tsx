import React, {useEffect} from 'react';
import {ModalMUI} from "../../../common/components/ModalMUI/ModalMUI";
import SuperInputText from "../../../common/components/c1-InputText/SuperInputText";
import SuperButton from "../../../common/components/c2-Button/SuperButton";
import css from "./AddNewCardModal.module.css"

import {useAppDispatch} from "../../../common/hooks/hooks";
import {useFormik} from "formik";
import {addNewCardTC} from "../cardList-reducer";
import {useParams} from "react-router-dom";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";


type AddNewPackPropsType = {
    open: boolean
    handleClose: () => void
    question?: string
    answer?:string
    id?:string
}

type FormikPackType = {
    question?: string
    answer?: string
}

export const AddNewCardModal: React.FC<AddNewPackPropsType> = (
    {
        open,
        handleClose,
        question,
        answer,
        id
    }
) => {
    const urlParams = useParams<'cardPackID'>();
    const cardsPack_ID = urlParams.cardPackID;
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            question: "",
            answer: ""
        },
        validate: (values) => {
            const errors: FormikPackType = {};
            if (formik.dirty && values.question.trim().length < 1) errors.question = "min question 1 symbols"
            if (formik.dirty && values.answer.trim().length < 1) errors.answer = "min answer 1 symbols"
            return errors;
        },
        onSubmit: values => {
            cardsPack_ID && dispatch(addNewCardTC({
                question: values.question, answer: values.answer, cardsPack_id: cardsPack_ID
            }));
            formik.resetForm();
            formik.setTouched({});
            formik.setErrors({question: undefined, answer: undefined});
            handleClose()
        },

    });

    useEffect(()=>{
        formik.setFieldValue("question", question)
        formik.setFieldValue("answer", answer)
        console.log("eseEffect modal", question, answer)
        // formik.setValues({packName: packNameFromPackListTable})

    },[question, answer])
    const cancelHandler = () => {
        formik.resetForm();
        handleClose();
    }
    const krestikHandler = () => {
        cancelHandler()
    }
    return (
        <div>

            <ModalMUI title={"Add New Card"} opens={open} handleClose={krestikHandler}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={10}
                            label="Age"
                            onChange={x=>x}
                        >
                            <MenuItem value={10}>Text</MenuItem>
                            <MenuItem value={20}>Picture</MenuItem>
                            <MenuItem value={30}>Video</MenuItem>
                        </Select>
                    </FormControl>
                    <SuperInputText
                        placeholder={"question"}
                        type="text" {...formik.getFieldProps('question')}
                        error={formik.errors.question && formik.touched.question ? formik.errors.question : ''}
                    />
                    <SuperInputText
                        placeholder={"answer"}
                        type="text" {...formik.getFieldProps('answer')}
                        error={formik.errors.answer && formik.touched.answer ? formik.errors.answer : ''}
                    />

                    <div className={css.buttons}>
                        <SuperButton onClick={cancelHandler} type='reset'>Cancel</SuperButton>
                        <SuperButton disabled={!(formik.isValid && formik.dirty)} type={'submit'}>Save</SuperButton>
                    </div>
                </form>
            </ModalMUI>

        </div>
    );
};
