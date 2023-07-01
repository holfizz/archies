import React, {FC, ReactNode, useState} from "react";
import cls from "./NavBarPages.module.scss";
import {BsPlus} from "react-icons/bs";
import Modal from "../ui/modal/Modal";
import Input, {InputStyle} from "../ui/input/Input";
import Button, {ButtonStyle} from "../ui/button/Button";

interface NavBarPagesInterface {
    title: string,
    children?: ReactNode
}

const NavBarPages: FC<NavBarPagesInterface> = ({title, children}) => {
    const [titleCard, setTitleCard] = useState<string>('')
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    return (
        <div className={cls.NavBarPages}>
            <h3 className={cls.NavBarPagesTitle}>{title}</h3>
            {children}
            <Button
                buttonStyle={ButtonStyle.DASHED_DARK}
                onClick={() => {
                    setModalVisible(true)
                }}
                className={cls.projectCardButton}><BsPlus/> Add Projects
            </Button>
            {modalVisible && <Modal visible={modalVisible} setVisible={setModalVisible}>
                <Input inputStyle={InputStyle.PRIMARY} onChange={setTitleCard} type={'text'}
                       placeholder={'Title project ... '}
                       value={titleCard}></Input>
                <Button className={cls.modalButton} buttonStyle={ButtonStyle.PRIMARY_LIGHT} onClick={() => {
                    console.log(titleCard)
                }}>Add Project
                </Button>
            </Modal>}
        </div>
    )
}

export default NavBarPages
