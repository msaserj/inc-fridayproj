import React, {useEffect} from 'react';
import {useAppDispatch} from "../../../common/hooks/hooks";
import {useFormik} from "formik";
import {updateCardsPackThunk} from "../packList-reducer";
import {ModalMUI} from "../../../common/components/ModalMUI/ModalMUI";
import SuperInputText from "../../../common/components/Primitive/c1-InputText/SuperInputText";
import css from "../AddNewPackModal/AddNewPackModal.module.css";
import SuperButton from "../../../common/components/Primitive/c2-Button/SuperButton";
import SuperCheckbox from "../../../common/components/Primitive/c3-Checkbox/SuperCheckbox";

type AddNewPackPropsType = {
	open: boolean
	handleClose: () => void
	idCard: string
	packNameFromPackListTable: string
	privatePackFromPackListTable: boolean
}
type FormikPackType = {
	packName?: string
	privatePack?: boolean
}

export const EditPackName: React.FC<AddNewPackPropsType> = (
	{
		open,
		handleClose,
		idCard,
		packNameFromPackListTable,
		privatePackFromPackListTable
	}
) => {
	const dispatch = useAppDispatch();
	const formik = useFormik({
		initialValues: {
			packName: '',
			privatePack: false
		},
		validate: (values) => {
			const errors: FormikPackType = {};
			if (formik.dirty && values.packName.trim().length < 5) errors.packName = "min 5 symbols"
			return errors;
		},
		onSubmit: values => {
			dispatch(updateCardsPackThunk(idCard, values.packName, values.privatePack))
			formik.resetForm();
			formik.setTouched({});
			formik.setErrors({packName: undefined, privatePack: undefined});
			handleClose()
		},
	});
	useEffect(()=>{
		formik.setFieldValue("packName", packNameFromPackListTable)
		formik.setFieldValue("privatePack", privatePackFromPackListTable)
	},[packNameFromPackListTable, privatePackFromPackListTable])
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
						 {...formik.getFieldProps('packName')}
						error={formik.errors.packName && formik.touched.packName ? formik.errors.packName : ''}
					/>

					<SuperCheckbox
						//checked={privatePackFromPackListTable} - вместо нужно помог Антон Хильманович:
						checked={formik.values.privatePack}
						{...formik.getFieldProps('privatePack')} >Private pack</SuperCheckbox>

					<div className={css.buttons}>
						<SuperButton onClick={cancelHandler} type='reset'>Cancel</SuperButton>
						<SuperButton disabled={!(formik.isValid && formik.dirty)} type={'submit'}>Save</SuperButton>
					</div>
				</form>
			</ModalMUI>
		</div>
	);
};

