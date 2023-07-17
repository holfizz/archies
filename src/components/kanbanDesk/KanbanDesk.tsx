import React, {FC, useEffect, useState} from "react";
import cls from './KanbanDesk.module.scss'
import HeaderKanbanDesk from "../haederKanbanDesk/HeaderKanbanDesk";
import KanbanColumn, {kanbanColumnsVar} from "../ui/kanbanColumn/KanbanColumn";
import {BoardSliceProps, setTasks} from "../../store/reducers/taskSlice";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {RootState} from "../../store/reducers";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import KanbanList from "../ui/kanbanList/KanbanList";
// import KanbanColumn, {kanbanColumnsVar} from "../ui/kanbanColumn/KanbanColumn";

const KanbanDesk: FC = () => {
    const boards = useTypedSelector((state: RootState) => state.boards.boards)
    const [tasksUpdate, setTasksUpdate] = useState<BoardSliceProps[]>([]);
    const [typeBoard, setTypeBoard] = useState<string>('');
    const dispatch = useDispatch()


    useEffect(() => {
        const tasksString = localStorage.getItem('boards');
        if (tasksString) {
            const tasksArray = JSON.parse(tasksString) as BoardSliceProps[];
            setTasksUpdate(tasksArray);
        }
    }, [boards]);

    interface KanbanColumnProps {
        statusColumn: string;
        titleColumn: string;
        kanbanVar: kanbanColumnsVar;
        className: string;
    }

    const columnsData: KanbanColumnProps[] = [
        {
            statusColumn: "todo",
            titleColumn: "To Do",
            kanbanVar: kanbanColumnsVar.TODO,
            className: cls.toDoBlock
        },
        {
            statusColumn: "progress",
            titleColumn: "In Progress",
            kanbanVar: kanbanColumnsVar.PROGRESS,
            className: cls.inProgressBlock
        },
        {
            statusColumn: "review",
            titleColumn: "Need Review",
            kanbanVar: kanbanColumnsVar.REVIEW,
            className: cls.needReviewBlock
        },
        {
            statusColumn: "done",
            titleColumn: "Done",
            kanbanVar: kanbanColumnsVar.DONE,
            className: cls.doneBlock
        }
    ];

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
    return (
        <div className={cls.kanbanDesk}>
            <HeaderKanbanDesk setTypeBoard={setTypeBoard}
                              lengthTasks={tasksUpdate.reduce((acc, task) => {
                                  return acc + (task.items?.length || 0);
                              }, 0)}
                              lengthDone={tasksUpdate.find((board) => board.name === 'done')?.items?.length || 0}
            />
            <div className={[cls.desk, typeBoard === 'board' ? cls.board : cls.list].join(' ')}>
                <DragDropContext
                    onDragEnd={(result: DropResult) => handleOnDragEnd(result)}>
                    {columnsData.map((column: KanbanColumnProps, index: number) => {
                        return (
                            <div>
                                {typeBoard === 'board' ?
                                    <KanbanColumn
                                        className={column.className}
                                        kanbanVar={column.kanbanVar}
                                        titleColumn={column.titleColumn}
                                        statusColumn={column.statusColumn}
                                        setTasksUpdate={setTasksUpdate}
                                        taskUpdate={tasksUpdate.find((board) => board.name === column.statusColumn)?.items || []}
                                        index={index}
                                    >
                                    </KanbanColumn>
                                    : <KanbanList
                                        className={column.className}
                                        kanbanVar={column.kanbanVar}
                                        titleColumn={column.titleColumn}
                                        statusColumn={column.statusColumn}
                                        setTasksUpdate={setTasksUpdate}
                                        taskUpdate={tasksUpdate.find((board) => board.name === column.statusColumn)?.items || []}
                                        index={index}
                                    >
                                    </KanbanList>
                                }
                            </div>
                        )

                    })}
                </DragDropContext>
            </div>
        </div>
    )
}

export default KanbanDesk
