import React, {Dispatch, FC, ReactNode, SetStateAction} from 'react';
import cls from './Modal.module.scss'

interface ModalProps {
    children?: ReactNode,
    visible: string | null,
    setVisible: Dispatch<SetStateAction<string | null>>
}

const DeleteModal: FC<ModalProps> = ({children, visible, setVisible}) => {
    const rootClasses = [cls.modal]
    if (visible?.length) {
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