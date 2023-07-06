import {FC, ReactNode, useState} from "react";
import cls from './KanbanColumn.module.scss'
import {BsPlus, BsThreeDotsVertical} from "react-icons/bs";
import Button, {ButtonStyle} from "../button/Button";
import KanbanCard from "../kanbanCard/KanbanCard";
import {useDispatch} from "react-redux";
import Modal from "../modal/Modal";
import Input, {InputStyle} from "../input/Input";
import {addTask} from "../../../store/reducers/taskSlice";


export enum kanbanColumnsVar {
    TODO = 'todo',
    PROGRESS = 'progress',
    REVIEW = 'review',
    DONE = 'done'
}

interface kanbanInterface {
    className?: string,
    kanbanVar: kanbanColumnsVar,
    titleColumn: string,
    children?: ReactNode,
    statusColumn: string
}

const KanbanColumn: FC<kanbanInterface> = ({className, kanbanVar, titleColumn, statusColumn, children}) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const dispatch = useDispatch()


    const handleDescriptionChange = (value: string) => {
        setDescription(value);
    };
    const handleTitleChange = (value: string) => {
        setTitle(value);
    };

    return (
        <div className={[cls.kanbanColumn, className].join(' ')}>
            <div className={cls.titleBlockKanban}>
                <div className={cls.titleBlock}>
                    <div className={kanbanVar && cls[kanbanVar + 'Ellipse']}></div>
                    <h2 className={cls.kanbanTitle}>{titleColumn}</h2>
                </div>
                <BsThreeDotsVertical/>
            </div>
            <Button onClick={() => {
                setVisible(true)
            }} buttonStyle={ButtonStyle.PRIMARY_DARK}><BsPlus/>Add New Task</Button>
            <div>{children}</div>
            <KanbanCard status={statusColumn}></KanbanCard>
            {visible && <Modal visible={visible} setVisible={setVisible}>
                <Input className={cls.modalAddTask} onChange={handleTitleChange} inputStyle={InputStyle.PRIMARY}
                       placeholder={'Title Task'}
                       type={'text'}></Input>
                <Input className={cls.modalAddTask} onChange={handleDescriptionChange}
                       inputStyle={InputStyle.PRIMARY}
                       placeholder={'Description Task'} type={'text'}></Input>
                <Button className={cls.modalAddTask} buttonStyle={ButtonStyle.PRIMARY_LIGHT}
                        onClick={() => {
                            dispatch(addTask({title: title, description: description, status: statusColumn}))
                            setDescription('')
                            setTitle('')
                            setVisible(false)
                        }}
                >
                    <BsPlus/> Add New Task
                </Button>
            </Modal>}
        </div>

    )
}

export default KanbanColumn
