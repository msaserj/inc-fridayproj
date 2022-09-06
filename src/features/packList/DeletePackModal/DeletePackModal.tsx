import React from "react";
import {useAppDispatch} from "../../../common/hooks/hooks";
import {deleteCardsPackThunk,} from "../packList-reducer";
import {ModalMUI} from "../../../common/components/ModalMUI/ModalMUI";
import css from "../AddNewPackModal/AddNewPackModal.module.css";
import SuperButton from "../../../common/components/c2-Button/SuperButton";


type AddNewPackPropsType = {
    open: boolean
    handleClose: () => void
    idCard: string
    packNameFromPackListTable: string
}

export const DeletePackModal: React.FC<AddNewPackPropsType> = (
    {
        open,
        handleClose,
        idCard,
        packNameFromPackListTable
    }
) => {
    const dispatch = useAppDispatch();

    const cancelHandler = () => {
        handleClose();
    }
    const deleteHandler = () => {
        dispatch(deleteCardsPackThunk(idCard))
        handleClose();
    }
    const krestikHandler = () => cancelHandler()
    return (
        <div>
            <ModalMUI title={"Delete Pack"} opens={open} handleClose={krestikHandler}>

                <div>
                    <p>Do you really want to remove <strong>{packNameFromPackListTable}</strong>?
                        All cards will be deleted. </p>
                </div>
                <div className={css.buttons}>

                    <SuperButton onClick={cancelHandler} type='reset'>Cancel</SuperButton>
                    <SuperButton onClick={deleteHandler}>Delete</SuperButton>
                </div>
            </ModalMUI>
        </div>
    );
};