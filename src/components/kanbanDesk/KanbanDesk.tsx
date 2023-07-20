import React, {ChangeEvent, FC, useEffect, useState} from "react";
import cls from './KanbanDesk.module.scss'
import HeaderKanbanDesk from "../haederKanbanDesk/HeaderKanbanDesk";
import {addColumn, BoardSliceProps, setTasks, TaskSliceProps} from "../../store/reducers/taskSlice";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {RootState} from "../../store/reducers";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {PiListChecksBold} from "react-icons/pi";
import {AiOutlineEye} from "react-icons/ai";
import {BsChatSquareDots, BsPlus} from "react-icons/bs";
import {FiPaperclip} from "react-icons/fi";
import Button, {ButtonStyle} from "../ui/button/Button";
import Modal from "../ui/modals/Modal";
import Input, {InputStyle} from "../ui/input/Input";
import KanbanBoard from "../ui/kanbanBoard/KanbarBoard";

interface KanbanDeskProps {
    searchQuery: string
}

const KanbanDesk: FC<KanbanDeskProps> = ({searchQuery}) => {
    const boards = useTypedSelector((state: RootState) => state.boards.boards)
    const [tasksUpdate, setTasksUpdate] = useState<BoardSliceProps[]>(boards);
    const [typeBoard, setTypeBoard] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [columnName, setColumnName] = useState<string>('');
    const [columnStatus, setColumnStatus] = useState<string>('');
    const [color, setColor] = useState<string>('#000000');
    const dispatch = useDispatch()

    useEffect(() => {
        const tasksString = localStorage.getItem('boards');
        if (tasksString) {
            const tasksArray = JSON.parse(tasksString) as BoardSliceProps[];
            setTasksUpdate(tasksArray);
        }
    }, [boards]);
    const data = useTypedSelector(state => state.boards.boards)
    const [filteredColumns, setFilteredColumns] = useState(data);
    useEffect(() => {
        const filtered = data.map((column) => ({
            ...column,
            items: column.items.filter(
                (item) =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        }));
        setFilteredColumns(filtered);
    }, [searchQuery]);
    const handleOnDragEnd = (result: DropResult) => {
        const {source, destination} = result;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
        const sourceTasks = tasksUpdate.find(tasks => tasks.name === source.droppableId)?.items || [];
        const destinationTasks = tasksUpdate.find(tasks => tasks.name === destination.droppableId)?.items || [];
        const [draggedTask] = sourceTasks.splice(source.index, 1);
        if (destinationTasks.length === 1 && sourceTasks.length > 1) {
            sourceTasks.splice(source.index, 0, draggedTask);
            return;
        }
        destinationTasks.splice(destination.index, 0, {...draggedTask, status: destination.droppableId});
        const newTasks = tasksUpdate.map(tasks => {
            if (tasks.name === source.droppableId) {
                return {
                    ...tasks,
                    items: sourceTasks.map((task, index) => ({
                        ...task,
                        order: index
                    }))
                };
            }
            if (tasks.name === destination.droppableId) {
                return {
                    ...tasks,
                    items: destinationTasks.map((task, index) => ({
                        ...task,
                        order: index
                    }))
                };
            }
            return tasks;
        });
        setTasksUpdate(newTasks);
        dispatch(setTasks({boards: newTasks}));
    };
    const handelAddColumn = () => {
        dispatch(addColumn({name: columnStatus, title: columnName, color: color}))
        setVisible(false)
    }
    return (
        <div className={cls.kanbanDesk}>
            {searchQuery.length ?
                <div className={cls.listSearch}>
                    {filteredColumns.map((column: any) => {
                        return column.items.map((item: TaskSliceProps) => {
                            return (
                                <div className={cls.card}>
                                    <div className={cls.cardCategoryTitle}>
                                        <div className={cls.category}>UX stages</div>
                                    </div>
                                    <h1 className={cls.cardTitle}>{item.title}</h1>
                                    <div className={cls.cardBlockParagraph}>
                                        <p className={cls.cardDescription}>{item.description}</p>
                                    </div>
                                    <div
                                        className={[cls.taskCompleteBlock,
                                            item.list.filter((subtask) => subtask.checked).length === item.list.length && item.list.length !== 0 && cls.green,
                                            item.list.length === 0 && cls.red
                                        ].join(' ')}>
                                        <PiListChecksBold/>
                                        {item.list.filter((subtask) => subtask.checked).length}/{item.list.length}
                                    </div>
                                    <div className={cls.line}></div>
                                    <div>
                                        <div className={cls.users}>
                                            <div className={[cls.user, cls.user_one].join(" ")}></div>
                                            <div className={[cls.user, cls.user_two].join(" ")}></div>
                                            <div className={[cls.user, cls.user_three].join(" ")}></div>
                                        </div>
                                        <div className={cls.socialStats}>
                                            <div className={cls.socialsButtonEye}>
                                                <AiOutlineEye></AiOutlineEye> 2
                                            </div>
                                            <div className={cls.socialsButtonComments}>
                                                <BsChatSquareDots/> 4
                                            </div>
                                            <div className={cls.socialsButtonClip}>
                                                <FiPaperclip/> 5
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        });
                    })}

                </div>
                : <>
                    <HeaderKanbanDesk setTypeBoard={setTypeBoard}
                                      lengthTasks={tasksUpdate.reduce((acc, task) => {
                                          return acc + (task.items?.length || 0);
                                      }, 0)}
                                      lengthDone={tasksUpdate.find((board) => board.name === 'done')?.items?.length || 0}
                    />
                    <div className={[cls.desk, typeBoard === 'board' ? cls.board : cls.list].join(' ')}>
                        <DragDropContext
                            onDragEnd={(result: DropResult) => handleOnDragEnd(result)}>

                            {tasksUpdate?.map((column: BoardSliceProps, index: number) => {
                                return (
                                    <>
                                        <KanbanBoard
                                            className={cls[column.name + 'Block']}
                                            kanbanVar={column.name}
                                            titleColumn={column.title}
                                            statusColumn={column.name}
                                            setTasksUpdate={setTasksUpdate}
                                            taskUpdate={tasksUpdate.find((board) => board.name === column.name)?.items || []}
                                            index={index}
                                            background={column.bg}
                                            id={column.id}
                                            mode={typeBoard}/>
                                    </>
                                )

                            })}
                            <Button onClick={() => setVisible(!visible)} className={cls.addColumnButton}
                                    buttonStyle={ButtonStyle.PRIMARY_LIGHT}><BsPlus/> Add Column</Button>
                        </DragDropContext>
                    </div>
                </>}
            {visible && <Modal visible={visible} setVisible={setVisible}>
                <Input onChange={setColumnName} placeholder={'Column Name'} type={'string'}
                       inputStyle={InputStyle.PRIMARY}
                ></Input>
                <Input onChange={setColumnStatus} placeholder={'Column Status'} type={'string'}
                       inputStyle={InputStyle.PRIMARY} className={cls.inputModal}
                ></Input>
                <Button onClick={() => handelAddColumn()} className={cls.buttonModal}
                        buttonStyle={ButtonStyle.PRIMARY_LIGHT}><BsPlus/> Add Column</Button>
                <div className={cls.modalBlock}>
                    <h2>Choose Color</h2>
                    <input className={cls.chooseColor} type={'color'}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}/>
                </div>
            </Modal>}
        </div>
    )
}

export default KanbanDesk
