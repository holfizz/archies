import React, {Dispatch, FC, SetStateAction} from 'react';
import cls from './CardInfModal.module.scss'

interface ModalProps {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<string | null>>,
    title: string;
    description: string;

}

const CardInfModal: FC<ModalProps> = ({visible, setVisible, title, description}) => {
    const rootClasses = [cls.modal]
    if (visible) {
        rootClasses.push(cls.active)
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(null)}>
            <div className={cls.modalContent} onClick={(e) => e.stopPropagation()}>
                <h1 className={cls.modalTitle}>{title}</h1>
            </div>
        </div>
    );
};

export default CardInfModal;