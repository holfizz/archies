import {FC, ReactNode} from "react";
import cls from './KanbanColumn.module.scss'
import {BsThreeDotsVertical} from "react-icons/bs";

export enum kanbanColumnsVar {
    TODO = 'todo',
    PROGRESS = 'progress',
    REVIEW = 'review',
    DONE = 'done'
}

interface kanbanInterface {
    className?: string,
    kanbanVar: kanbanColumnsVar,
    title: string,
    children?: ReactNode
}

const KanbanColumn: FC<kanbanInterface> = ({className, kanbanVar, title, children}) => {
    return (
        <div className={[cls.kanbanColumn, className].join(' ')}>
            <div>
                <div>
                    <div className={kanbanVar && cls[kanbanVar]}></div>
                    <h2>{title}</h2>
                </div>
                <BsThreeDotsVertical/>
            </div>
            <div>{children}</div>

        </div>
    )
}

export default KanbanColumn
