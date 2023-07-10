import React, {FC, useState} from "react";
import cls from './KanbanDesk.module.scss'
import HeaderKanbanDesk from "../haederKanbanDesk/HeaderKanbanDesk";
import KanbanColumn, {kanbanColumnsVar} from "../ui/kanbanColumn/KanbanColumn";
import {setTasks, TaskSliceProps} from "../../store/reducers/taskSlice";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers";
// import KanbanColumn, {kanbanColumnsVar} from "../ui/kanbanColumn/KanbanColumn";

const KanbanDesk: FC = () => {
    const tasks = useSelector((state: RootState) => state.task.tasks)
    const [tasksUpdate, setTasksUpdate] = useState<TaskSliceProps[]>(tasks)
    const dispatch = useDispatch()
    type TaskUpdateFn = (taskId: string, newStatus: string) => TaskSliceProps[];

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
        const {source, destination, draggableId} = result;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
        const columnTasks = tasks.filter(task => task.status === destination.droppableId);

        const [draggedTask] = columnTasks.splice(source.index, 1);
        columnTasks.splice(destination.index, 0, draggedTask);
        const newTasks = tasks.map(task => {
            if (task.id === draggableId) {
                return {
                    ...task,
                    columnId: destination.droppableId,
                    order: destination.index
                };
            }
            return task;
        });
        setTasks(newTasks);
    }

    return (
        <div className={cls.kanbanDesk}>
            <HeaderKanbanDesk></HeaderKanbanDesk>
            <div className={cls.desk}>
                <DragDropContext onDragEnd={(result: DropResult) => handleOnDragEnd(result)}>
                    {columnsData.map((column: KanbanColumnProps, index: number) => (
                        <KanbanColumn
                            className={column.className}
                            kanbanVar={column.kanbanVar}
                            titleColumn={column.titleColumn}
                            statusColumn={column.statusColumn}
                            setTasksUpdate={setTasksUpdate}
                            taskUpdate={tasksUpdate}
                            tasks={tasks}>
                        </KanbanColumn>
                    ))}
                </DragDropContext>
            </div>
        </div>
    )
}

export default KanbanDesk
