import React, {FC, useEffect, useState} from "react";
import cls from './KanbanDesk.module.scss'
import HeaderKanbanDesk from "../haederKanbanDesk/HeaderKanbanDesk";
import KanbanColumn, {kanbanColumnsVar} from "../ui/kanbanColumn/KanbanColumn";
import {BoardSliceProps, setTasks} from "../../store/reducers/taskSlice";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {RootState} from "../../store/reducers";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
// import KanbanColumn, {kanbanColumnsVar} from "../ui/kanbanColumn/KanbanColumn";

const KanbanDesk: FC = () => {
    const boards = useTypedSelector((state: RootState) => state.boards.boards)
    const [tasksUpdate, setTasksUpdate] = useState<BoardSliceProps[]>([]);
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
    const [columns, setColumns] = useState(boards);

    const handleOnDragEnd = (result: DropResult) => {
        const {source, destination, draggableId} = result;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            return;
        }
        const sourceTasks = tasksUpdate.find(tasks => tasks.name === source.droppableId)?.items || [];
        const destinationTasks = tasksUpdate.find(tasks => tasks.name === destination.droppableId)?.items || [];
        if (sourceTasks.length === 1) {
            // If there is only one item in the source column, prevent it from being dragged out
            return;
        }
        const [draggedTask] = sourceTasks.splice(source.index, 1);
        destinationTasks.splice(destination.index, 0, draggedTask);
        const newTasks = tasksUpdate.map(tasks => {
            if (tasks.name === source.droppableId) {
                return {
                    ...tasks,
                    items: sourceTasks
                };
            }
            if (tasks.name === destination.droppableId) {
                return {
                    ...tasks,
                    items: destinationTasks.map((task, index) => {
                        if (task.id === draggableId) {
                            return {
                                ...task,
                                id: destination.droppableId,
                                order: index
                            };
                        }
                        return task;
                    })
                };
            }
            return tasks;
        });
        setTasksUpdate(newTasks);
        dispatch(setTasks({boards: newTasks}))

    };
    return (
        <div className={cls.kanbanDesk}>
            <HeaderKanbanDesk
                lengthTasks={tasksUpdate.reduce((acc, task) => {
                    return acc + (task.items?.length || 0);
                }, 0)}
                lengthDone={tasksUpdate.find((board) => board.name === 'done')?.items?.length || 0}
            />
            <div className={cls.desk}>
                <DragDropContext
                    onDragEnd={(result: DropResult) => handleOnDragEnd(result)}>
                    {columnsData.map((column: KanbanColumnProps, index: number) => (
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
                    ))}
                </DragDropContext>
            </div>
        </div>
    )
}

export default KanbanDesk
