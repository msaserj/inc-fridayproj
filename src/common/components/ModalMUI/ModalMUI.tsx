import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {ReactNode} from "react";
import SuperButton from "../Primitive/c2-Button/SuperButton";
import css from "./ModalMui.module.css"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
type PropsType = {
    children: ReactNode,
    title: string
    opens: boolean
    handleClose: () => void
}


export const ModalMUI: React.FC<PropsType> = (
    {children, title, opens, handleClose}) => {

    return (
        <div>

            <Modal
                open={opens}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={css.titleClose}>
                        <h3>{title} </h3> <SuperButton style={{backgroundColor: "white", color: "black"}} onClick={handleClose}>X</SuperButton>
                    </div>
                    <hr style={{width: "100%"}}/>

                    {children}

                </Box>
            </Modal>
        </div>
    );
}
