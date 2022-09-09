import React from "react";
import {useAppDispatch} from "../../../common/hooks/hooks";
import {ModalMUI} from "../../../common/components/ModalMUI/ModalMUI";
import SuperButton from "../../../common/components/c2-Button/SuperButton";
import {deleteCardTC} from "../cardList-reducer";
import css from "./DeleteCardModal.module.css"
import {CardListPropsType} from "../CardListTable/CardListTable";

type AddNewPackPropsType = {
    open: boolean
    handleClose: () => void
    idPack: CardListPropsType
    idCard: string
    cardQuestion: string
}

export const DeleteCardModal: React.FC<AddNewPackPropsType> = (
    {
        open,
        handleClose,
        idPack,
        idCard,
        cardQuestion
    }
) => {
    const dispatch = useAppDispatch();

    const cancelHandler = () => {
        handleClose();
    }
    const deleteHandler = () => {
        idPack.idPack && dispatch(deleteCardTC(idPack.idPack, idCard));
        handleClose();
    }
    const krestikHandler = () => cancelHandler()

    return (
        <div>
            <ModalMUI title={"Delete Pack"} opens={open} handleClose={krestikHandler}>
                <div>
                    <p>Do you really want to remove <strong>{cardQuestion}</strong>?
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