import React, {FC, ReactNode, useState} from "react";
import cls from './KanbanColumn.module.scss'
import {BsPlus, BsThreeDotsVertical} from "react-icons/bs";
import Button, {ButtonStyle} from "../button/Button";
import KanbanCard from "../kanbanCard/KanbanCard";
import {useDispatch} from "react-redux";
import Modal from "../modals/Modal";
import Input, {InputStyle} from "../input/Input";
import {Droppable} from "react-beautiful-dnd";
import {addTask, deleteColumn, deleteTask, TaskSliceProps} from "../../../store/reducers/taskSlice";
import {v4 as uuidv4} from 'uuid';
import {GrFormClose} from "react-icons/gr";
import DeleteModal from "../modals/DeleteModal";


interface kanbanInterface {
    className?: string,
    kanbanVar: string,
    titleColumn: string,
    children?: ReactNode,
    statusColumn: string
    setTasksUpdate: any
    taskUpdate: any[],
    index: number,
    background: string,
    id: string
}

const KanbanColumn: FC<kanbanInterface> = ({
                                               className,
                                               kanbanVar,
                                               titleColumn,
                                               statusColumn,
                                               children,
                                               setTasksUpdate,
                                               taskUpdate,
                                               index,
                                               background,
                                               id
                                           }) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [columnModal, setColumnModal] = useState<string | null>(null)
    const [columnModalTwo, setColumnModalTwo] = useState<string | null>(null)

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
    const handleModalToggle = (index: string) => {
        setColumnModal((prevIndex) => (prevIndex === index ? null : index));
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
                                    <div style={{background: background}} className={kanbanVar && cls.ellipse}></div>
                                    <h2 className={cls.kanbanTitle}>{titleColumn}</h2>
                                </div>
                                <div onClick={() => setColumnModal(index.toString())} className={cls.ellipseNum}>
                                    <h1>{taskUpdate.length}</h1>
                                </div>
                            </div>
                            <div onClick={() => {
                                handleModalToggle(index.toString())
                                console.log(index.toString())
                            }} className={cls.dotsController}>
                                <BsThreeDotsVertical/>
                            </div>
                        </div>
                        <Button onClick={() => {
                            setVisible(true)
                        }} buttonStyle={ButtonStyle.PRIMARY_DARK}><BsPlus/>Add New Task</Button>
                        <div>{children}</div>
                        <KanbanCard typeBoard={'board'} tasks={taskUpdate}
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
                    {columnModal === index.toString() && (
                        <div className={cls.modal}>
                            <div className={cls.modalContent}>
                                <div
                                    className={cls.closeModal}
                                    onClick={(e: any) => {
                                        e.stopPropagation();
                                        handleModalToggle(index.toString());
                                    }}
                                >
                                    <GrFormClose/>
                                </div>
                                <div className={cls.modalBody}>
                                    <Button
                                        onClick={() => {
                                            handleModalToggle(index.toString());
                                            setColumnModalTwo(index.toString())
                                        }}
                                        buttonStyle={ButtonStyle.CLEAR}
                                        className={cls.buttonDelete}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {columnModalTwo === index.toString() &&
                        <DeleteModal setVisible={setColumnModalTwo} visible={columnModalTwo}>
                            <h3>Do you really want to delete a column</h3>
                            <Button onClick={() => dispatch(deleteColumn(id))}
                                    buttonStyle={ButtonStyle.PRIMARY_LIGHT}>Delete</Button>
                        </DeleteModal>
                    }
                </div>
            )}

        </Droppable>
    )
}

export default KanbanColumn