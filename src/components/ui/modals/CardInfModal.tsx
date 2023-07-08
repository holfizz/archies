import React, {Dispatch, FC, ReactNode, SetStateAction} from 'react';
import cls from './CardInfModal.module.scss'

interface ModalProps {
    children?: ReactNode,
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>
}

const CardInfModal: FC<ModalProps> = ({children, visible, setVisible}) => {
    const rootClasses = [cls.modal]
    if (visible) {
        rootClasses.push(cls.active)
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cls.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default CardInfModal;