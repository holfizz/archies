import React, {FC, ReactNode, useState} from "react";
import cls from './KanbarBoard.module.scss'
import {BsPlus, BsThreeDotsVertical} from "react-icons/bs";
import Button, {ButtonStyle} from "../button/Button";
import KanbanCard from "../kanbanCard/KanbanCard";
import {useDispatch} from "react-redux";
import Modal from "../modals/Modal";
import Input, {InputStyle} from "../input/Input";
import {Droppable} from "@hello-pangea/dnd";
import {addTask, deleteColumn, deleteTask, TaskSliceProps} from "../../../store/reducers/taskSlice";
import {v4 as uuidv4} from 'uuid';
import {GrFormClose} from "react-icons/gr";
import DeleteModal from "../modals/DeleteModal";
import Select from 'react-select'


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
    id: string,
    mode: string
}

const KanbanBoard: FC<kanbanInterface> = ({
                                              className,
                                              kanbanVar,
                                              titleColumn,
                                              statusColumn,
                                              children,
                                              setTasksUpdate,
                                              taskUpdate,
                                              index,
                                              background,
                                              id,
                                              mode
                                          }) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [tag, setTag] = useState<string>('UX Stages')
    const [columnModal, setColumnModal] = useState<number | null>(null)
    const [columnModalTwo, setColumnModalTwo] = useState<number | null>(null)

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
    const handleModalToggle = (index: number) => {
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
            list: [],
            tag: tag
        };

        dispatch(addTask({
            boardId: index,
            task: newTask,
        }));

        const updatedTasks = [...taskUpdate, newTask];
        setTasksUpdate(updatedTasks);
    }

    interface optionsProps {
        label: string
        color: string
        tag: string
    }

    const options: optionsProps[] = [
        {label: 'UX Stages', color: '#f8a83f', tag: 'stages'},
        {label: 'Design', color: '#6c49ec', tag: 'design'},
        {label: 'Branding', color: '#ea8783', tag: 'branding'},
    ]
    const stylesOptions = {
        control: (baseStyles: any, state: any) => ({
            ...baseStyles,
            border: '1px solid #fff',
            background: '#365EFF',
            color: '#fff',
            margin: '10px 0'

        }),
        menu: (baseStyles: any, state: any) => ({
            ...baseStyles,
            border: 'none',
            borderRadius: '0',
            margin: '0',
            padding: '0',


        }),
        option: (styles: any, {data}: any) => {
            return {
                ...styles,
                color: data.color,
                border: `1px solid ${data.color}`,
                background: data.color + '60',
                margin: '3px 0',
                padding: 0,
                height: '40px',
                display: 'flex',
                alignItems: 'center',

            }
        },
    }

    return (
        <div className={[cls.column, className, mode === 'list' ? cls.horizontalColumn : cls.verticalColumn].join(' ')}>

            <div className={cls.titleBlockKanban}>
                <div className={cls.titleBlockNum}>
                    <div className={cls.titleBlock}>
                        <div style={{background: background}} className={kanbanVar && cls.ellipse}></div>
                        <h2 className={cls.kanbanTitle}>{titleColumn}</h2>
                    </div>
                    <div onClick={() => setColumnModal(index)} className={cls.ellipseNum}>
                        <h1>{taskUpdate.length}</h1>
                    </div>
                </div>
                <div
                    onClick={() => {
                        handleModalToggle(index)
                    }} className={cls.dotsController}>
                    <BsThreeDotsVertical/>
                </div>
            </div>

            <Button onClick={() => {
                setVisible(true)
            }} buttonStyle={ButtonStyle.PRIMARY_DARK}><BsPlus/>Add New Task</Button>
            <div>{children}</div>
            <Droppable droppableId={statusColumn} key={statusColumn}
                       direction={mode === 'list' ? 'horizontal' : 'vertical'}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <div
                            className={[cls.kanbanColumn, className, mode === 'list' ? cls.horizontal : cls.vertical].join(' ')}>

                            <KanbanCard typeBoard={mode} tasks={taskUpdate}
                                        onDeleteTask={handleDeleteTask}/>
                            {visible &&
                                <Modal visible={visible} setVisible={setVisible}>
                                    <Input className={cls.modalAddTask} onChange={handleTitleChange}
                                           inputStyle={InputStyle.PRIMARY}
                                           placeholder={'Title Task'}
                                           type={'text'}></Input>
                                    <Input className={cls.modalAddTask} onChange={handleDescriptionChange}
                                           inputStyle={InputStyle.PRIMARY}
                                           placeholder={'Description Task'} type={'text'}></Input>
                                    <Select options={options} styles={stylesOptions}
                                            onChange={(selectedOption: any) => {
                                                setTag(selectedOption.label);
                                            }}
                                            placeholder={<div className={cls.placeholderText}>Select category</div>}
                                    />
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
                        {columnModal === index && (
                            <div className={cls.modal}>
                                <div className={cls.modalContent}>
                                    <div
                                        className={cls.closeModal}
                                        onClick={(e: any) => {
                                            e.stopPropagation();
                                            handleModalToggle(index);
                                        }}
                                    >
                                        <GrFormClose/>
                                    </div>
                                    <div className={cls.modalBody}>
                                        {kanbanVar === 'done' ?
                                            <button className={cls.deleteNotPossible}>
                                                Deletion is not possible
                                            </button> :
                                            <Button
                                                onClick={() => {
                                                    handleModalToggle(index);
                                                    setColumnModalTwo(index)
                                                }}
                                                buttonStyle={ButtonStyle.CLEAR}
                                                className={cls.buttonDelete}
                                            >
                                                Delete
                                            </Button>}

                                    </div>
                                </div>
                            </div>
                        )}
                        {columnModalTwo === index &&
                            <DeleteModal setVisible={setColumnModalTwo} visible={columnModalTwo}>
                                <h3>Do you really want to delete a column</h3>
                                <Button onClick={() => {
                                    dispatch(deleteColumn(id))
                                    setColumnModalTwo(null)
                                }}
                                        buttonStyle={ButtonStyle.PRIMARY_LIGHT}>Delete</Button>
                            </DeleteModal>
                        }
                    </div>
                )}

            </Droppable>
        </div>
    )
}

export default KanbanBoard