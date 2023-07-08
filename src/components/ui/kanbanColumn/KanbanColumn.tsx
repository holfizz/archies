import {FC, ReactNode, useState} from "react";
import cls from './KanbanColumn.module.scss'
import {BsPlus, BsThreeDotsVertical} from "react-icons/bs";
import Button, {ButtonStyle} from "../button/Button";
import KanbanCard from "../kanbanCard/KanbanCard";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../modals/Modal";
import Input, {InputStyle} from "../input/Input";
import {addTask, setTasks} from "../../../store/reducers/taskSlice";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import {RootState} from "../../../store/reducers";

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
    const tasks = useSelector((state: RootState) => state.task.tasks)

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const newTasks = Array.from(tasks);
        const [removed] = newTasks.splice(result.source.index, 1);
        newTasks.splice(result.destination.index, 0, removed);
        dispatch(setTasks(newTasks));
    };
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId={statusColumn} key={statusColumn}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
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
                                <Input className={cls.modalAddTask} onChange={handleTitleChange}
                                       inputStyle={InputStyle.PRIMARY}
                                       placeholder={'Title Task'}
                                       type={'text'}></Input>
                                <Input className={cls.modalAddTask} onChange={handleDescriptionChange}
                                       inputStyle={InputStyle.PRIMARY}
                                       placeholder={'Description Task'} type={'text'}></Input>
                                <Button className={cls.modalAddTask} buttonStyle={ButtonStyle.PRIMARY_LIGHT}
                                        onClick={() => {
                                            dispatch(addTask({
                                                title: title,
                                                description: description,
                                                status: statusColumn
                                            }))
                                            setDescription('')
                                            setTitle('')
                                            setVisible(false)
                                        }}
                                >
                                    <BsPlus/> Add New Task
                                </Button>
                            </Modal>}
                        </div>
                        {provided.placeholder}
                    </div>
                )}

            </Droppable></DragDropContext>
    )
}

export default KanbanColumn