import {Dispatch, FC, SetStateAction, useState} from 'react';
import cls from './CardInfModal.module.scss'
import Button, {ButtonStyle} from "../button/Button";
import Input, {InputStyle} from "../input/Input";
import {useDispatch} from "react-redux";
import {addSubtaskToList, deleteSubtaskFromList, setSubtask, Subtask} from "../../../store/reducers/taskSlice";
import {IoRemoveCircleOutline} from "react-icons/io5";

interface ModalProps {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<string | null>>,
    title: string;
    description: string;
    list?: Subtask[];
    status: string
    id: string
}

const CardInfModal: FC<ModalProps> = ({visible, setVisible, title, description, list, status, id}) => {
    const rootClasses = [cls.modal];
    if (visible) {
        rootClasses.push(cls.active);
    }
    const [subtaskTitle, setSubtaskTitle] = useState<string>('');
    const dispatch = useDispatch();
    const handleAddSubtaskClick = () => {
        setSubtaskTitle('')
        dispatch(addSubtaskToList({boardId: status, subtaskTitle: subtaskTitle, taskId: id}));
    };
    const handleRemoveSubtaskClick = (idSubtask: string) => {
        dispatch(deleteSubtaskFromList({boardId: status, taskId: id, subtaskId: idSubtask}));
    };
    const handleCheckboxChange = (idSubtask: string, checked: boolean) => {
        dispatch(setSubtask({boardId: status, taskId: id, subtaskId: idSubtask, checked: checked}))
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(null)}>
            <div className={cls.modalContent} onClick={(e) => e.stopPropagation()}>
                <h1 className={cls.modalTitle}>Title : {title}</h1>
                <p className={cls.modalTitle}>Description : {description}</p>
                <div className={cls.addTaskBlock}>
                    <Button buttonStyle={ButtonStyle.PRIMARY_LIGHT} onClick={handleAddSubtaskClick}>
                        Add a Subtask
                    </Button>
                    <Input
                        onChange={setSubtaskTitle}
                        className={cls.inputSubtask}
                        placeholder={'Subtask Title'}
                        type={'string'}
                        inputStyle={InputStyle.BLUE}
                        value={subtaskTitle}

                    />
                    {list && (
                        <ul>
                            {list?.map((item: Subtask, index: number) => (
                                <div className={cls.itemList} key={index}>
                                    {item.checked ? <li className={cls.itemChecked}>
                                        {index + 1}. {item.title}
                                    </li> : <li>
                                        {index + 1}. {item.title}
                                    </li>}

                                    <div className={cls.controlItem}>
                                        <button className={cls.buttonDelete}
                                                onClick={() => handleRemoveSubtaskClick(item.id)}>
                                            <IoRemoveCircleOutline/>
                                        </button>
                                        <input className={cls.customCheckbox} checked={item.checked}
                                               onClick={() => handleCheckboxChange(item.id, !item.checked)}
                                               type={'checkbox'}/>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
export default CardInfModal;