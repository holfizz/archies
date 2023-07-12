import React, {FC, useEffect, useState} from "react";
import cls from './KanbanDesk.module.scss'
import HeaderKanbanDesk from "../haederKanbanDesk/HeaderKanbanDesk";
import KanbanColumn, {kanbanColumnsVar} from "../ui/kanbanColumn/KanbanColumn";
import {BoardSliceProps} from "../../store/reducers/taskSlice";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {RootState} from "../../store/reducers";
import {useTypedSelector} from "../../hooks/useTypedSelector";
// import KanbanColumn, {kanbanColumnsVar} from "../ui/kanbanColumn/KanbanColumn";

const KanbanDesk: FC = () => {
    const boards = useTypedSelector((state: RootState) => state.boards.boards)
    const [tasksUpdate, setTasksUpdate] = useState<BoardSliceProps[]>([]);

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
    const handleOnDragEnd = (result: DropResult, columns: any, setColumns: any) => {
        if (!result.destination) return;
        const {source, destination} = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };
    return (
        <div className={cls.kanbanDesk}>
            <HeaderKanbanDesk></HeaderKanbanDesk>
            <div className={cls.desk}>
                <DragDropContext onDragEnd={(result: DropResult) => handleOnDragEnd(result, columns, setColumns)}>
                    {columnsData.map((column: KanbanColumnProps) => (
                        <KanbanColumn
                            className={column.className}
                            kanbanVar={column.kanbanVar}
                            titleColumn={column.titleColumn}
                            statusColumn={column.statusColumn}
                            setTasksUpdate={setTasksUpdate}
                            taskUpdate={tasksUpdate.find((board) => board.name === column.statusColumn)?.items || []}
                        >
                        </KanbanColumn>
                    ))}
                </DragDropContext>
            </div>
        </div>
    )
}

export default KanbanDesk
