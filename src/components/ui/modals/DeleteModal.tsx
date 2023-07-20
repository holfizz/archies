import React, {Dispatch, FC, ReactNode, SetStateAction} from 'react';
import cls from './Modal.module.scss'

interface ModalProps {
    children?: ReactNode,
    visible: string | null | number,
    setVisible: Dispatch<SetStateAction<null | number>>
}

const DeleteModal: FC<ModalProps> = ({children, visible, setVisible}) => {
    const rootClasses = [cls.modal]
    if (visible) {
        rootClasses.push(cls.active)
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(null)}>
            <div className={cls.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default DeleteModal;