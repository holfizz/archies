import {FC, ReactNode, useState} from "react";
import cls from './KanbanColumn.module.scss'
import {BsPlus, BsThreeDotsVertical} from "react-icons/bs";
import Button, {ButtonStyle} from "../button/Button";
import KanbanCard from "../kanbanCard/KanbanCard";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../modals/Modal";
import Input, {InputStyle} from "../input/Input";
import {addTask, deleteTask, setTasks, TaskSliceProps} from "../../../store/reducers/taskSlice";
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

    const tasks = useSelector((state: RootState) => state.task.tasks)
    const [tasksUpdate, setTasksUpdate] = useState<TaskSliceProps[]>(tasks)

    const dispatch = useDispatch()

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
    };
    const handleTitleChange = (value: string) => {
        setTitle(value);
    };

    const handleOnDragEnd = (result: DropResult, status: string) => {
        if (!result.destination) return;
        const {source, destination} = result;

        // Отфильтровываем только элементы с нужным статусом
        const filteredTasks = tasksUpdate.filter(task => task.status === status);

        const [removed] = filteredTasks.splice(source.index, 1);
        filteredTasks.splice(destination.index, 0, removed);

        // Обновляем состояние задач с новым массивом, содержащим отфильтрованные элементы
        const newTasks = tasksUpdate.map(task => {
            if (task.status === status) {
                return filteredTasks.shift() || task;
            } else {
                return task;
            }
        });

        dispatch(setTasks(newTasks));
        setTasksUpdate(newTasks);
    };
    const handleDeleteTask = (task: TaskSliceProps) => {
        dispatch(deleteTask(task));
        // @ts-ignore
        setTasksUpdate((prevTasks: TaskSliceProps[]) => {
            return prevTasks.filter((t: TaskSliceProps) => t.title !== task.title);
        });
    };
    return (
        <DragDropContext onDragEnd={(result: DropResult) => handleOnDragEnd(result, statusColumn)}>
            <Droppable droppableId={statusColumn} key={statusColumn}>
                {(provided) => (
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
                            <KanbanCard tasks={tasks} status={statusColumn} onDeleteTask={handleDeleteTask}/>
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
                                            setTasksUpdate([...tasks, {
                                                title: title,
                                                description: description,
                                                status: statusColumn
                                            }])
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