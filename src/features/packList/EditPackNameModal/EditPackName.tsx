import React, {useEffect} from 'react';
import {useAppDispatch} from "../../../common/hooks/hooks";
import {useFormik} from "formik";
import {updateCardsPackThunk} from "../packList-reducer";
import {ModalMUI} from "../../../common/components/ModalMUI/ModalMUI";
import SuperInputText from "../../../common/components/c1-InputText/SuperInputText";
import css from "../AddNewPackModal/AddNewPackModal.module.css";
import SuperButton from "../../../common/components/c2-Button/SuperButton";

type AddNewPackPropsType = {
	open: boolean
	handleClose: () => void
	idCard: string
	packNameFromPackListTable: string
}
type FormikPackType = {
	packName?: string
}

export const EditPackName: React.FC<AddNewPackPropsType> = (
	{
		open,
		handleClose,
		idCard,
		packNameFromPackListTable
	}
) => {
	const dispatch = useAppDispatch();
	const formik = useFormik({
		initialValues: {
			packName: '',
		},
		validate: (values) => {
			const errors: FormikPackType = {};
			if (formik.dirty && values.packName.trim().length < 5) errors.packName = "min 5 symbols"
			return errors;
		},
		onSubmit: values => {
			dispatch(updateCardsPackThunk(idCard, values.packName))
			formik.resetForm();
			formik.setTouched({});
			formik.setErrors({packName: undefined});
			handleClose()
		},
	});
	useEffect(()=>{
		formik.setFieldValue("packName", packNameFromPackListTable)

	},[packNameFromPackListTable])
	const cancelHandler = () => {
		formik.resetForm();
		handleClose();
	}
	const krestikHandler = () => cancelHandler()
	return (
		<div>
			<ModalMUI title={"Edit Pack Name"} opens={open} handleClose={krestikHandler}>
				<form onSubmit={formik.handleSubmit}>
					<SuperInputText
						type="text" {...formik.getFieldProps('packName')}
						error={formik.errors.packName && formik.touched.packName ? formik.errors.packName : ''}
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

