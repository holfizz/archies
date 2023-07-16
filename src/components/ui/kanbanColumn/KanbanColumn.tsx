import {FC, ReactNode, useState} from "react";
import cls from './KanbanColumn.module.scss'
import {BsPlus, BsThreeDotsVertical} from "react-icons/bs";
import Button, {ButtonStyle} from "../button/Button";
import KanbanCard from "../kanbanCard/KanbanCard";
import {useDispatch} from "react-redux";
import Modal from "../modals/Modal";
import Input, {InputStyle} from "../input/Input";
import {Droppable} from "react-beautiful-dnd";
import {addTask, deleteTask, TaskSliceProps} from "../../../store/reducers/taskSlice";
import {v4 as uuidv4} from 'uuid';

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
    setTasksUpdate: any
    taskUpdate: any[],
    index: number
}

const KanbanColumn: FC<kanbanInterface> = ({
                                               className,
                                               kanbanVar,
                                               titleColumn,
                                               statusColumn,
                                               children,
                                               setTasksUpdate,
                                               taskUpdate,
                                               index
                                           }) => {
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
    const handleDeleteTask = (task: TaskSliceProps, status: string, taskId: string) => {
        dispatch(deleteTask({boardId: index, taskId: taskId}));
        setTasksUpdate((prevTasks: TaskSliceProps[]) =>
            prevTasks.filter((t: TaskSliceProps) => t.id !== task.id)
        );
    };

    function handleAddTask(title: string, description: string, statusColumn: string, taskUpdate: TaskSliceProps[]) {
        const tasksWithSameStatus = taskUpdate.filter(task => task.status === statusColumn);
        const newTask: TaskSliceProps = {
            id: uuidv4(),
            title: title,
            description: description,
            status: statusColumn,
            order: tasksWithSameStatus.length,
            list: []
        };

        dispatch(addTask({
            boardId: index,
            task: newTask,
        }));

        const updatedTasks = [...taskUpdate, newTask];
        setTasksUpdate(updatedTasks);
    }

    return (
        <Droppable droppableId={statusColumn} key={statusColumn}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    <div className={[cls.kanbanColumn, className].join(' ')}>
                        <div className={cls.titleBlockKanban}>
                            <div className={cls.titleBlockNum}>
                                <div className={cls.titleBlock}>
                                    <div className={kanbanVar && cls[kanbanVar + 'Ellipse']}></div>
                                    <h2 className={cls.kanbanTitle}>{titleColumn}</h2>
                                </div>
                                <div className={cls.ellipseNum}>
                                    <h1>{taskUpdate.length}</h1>
                                </div>
                            </div>
                            <BsThreeDotsVertical/>
                        </div>
                        <Button onClick={() => {
                            setVisible(true)
                        }} buttonStyle={ButtonStyle.PRIMARY_DARK}><BsPlus/>Add New Task</Button>
                        <div>{children}</div>
                        <KanbanCard tasks={taskUpdate}
                                    onDeleteTask={handleDeleteTask}/>
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
                                        handleAddTask(title, description, statusColumn, taskUpdate)
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

        </Droppable>
    )
}

export default KanbanColumn