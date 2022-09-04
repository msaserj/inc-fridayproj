import React from 'react';
import {ModalMUI} from "../../../common/components/ModalMUI/ModalMUI";
import SuperInputText from "../../../common/components/c1-InputText/SuperInputText";
import SuperButton from "../../../common/components/c2-Button/SuperButton";
import css from "./AddNewPack.module.css"
import SuperCheckbox from "../../../common/components/c3-Checkbox/SuperCheckbox";
import {useAppDispatch} from "../../../common/hooks/hooks";
import {useFormik} from "formik";

import {addNewPackThunk} from "../packList-reducer";

type AddNewPackPropsType = {
    open: boolean
    handleClose: () => void
}

type FormikPackType = {
    packName?: string
    privatePack?: boolean
}

export const AddNewPack: React.FC<AddNewPackPropsType> = (
    {
        open,
        handleClose,
    }
) => {
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues : {
            packName: "",
            privatePack: false
        },
        validate: (values) => {
            const errors: FormikPackType = {};
            if (formik.dirty && values.packName.trim().length < 5) errors.packName = "min 5 symbols"
            return errors;
        },
        onSubmit: values => {
            dispatch(addNewPackThunk(values.packName, values.privatePack))
            formik.resetForm();
            formik.setTouched({});
            formik.setErrors({privatePack: undefined, packName: undefined});
            handleClose()
        },

    });
    const cancelHandler = () => {
        formik.resetForm();
        handleClose();
    }
    const krestikHandler = () => {
        cancelHandler()
    }

    return (
        <div>

            <ModalMUI title={"Add New Pack"} opens={open} handleClose={krestikHandler}>
                <form onSubmit={formik.handleSubmit} >
                <SuperInputText
                    placeholder={"Name pack"}
                    type="text" {...formik.getFieldProps('packName')}
                    error={formik.errors.packName && formik.touched.packName ? formik.errors.packName : ''}
                />
                <SuperCheckbox  {...formik.getFieldProps('privatePack')} >Private pack</SuperCheckbox>
                <div className={css.buttons}>
                    <SuperButton onClick={cancelHandler} type='reset'>Cancel</SuperButton>
                    <SuperButton disabled={!(formik.isValid && formik.dirty)} type={'submit'} >Save</SuperButton>
                </div>
                </form>
            </ModalMUI>

        </div>
    );
};
