import {FC} from "react";
import cls from './KanbanDesk.module.scss'
import KanbanColumn, {kanbanColumnsVar} from "../ui/kanbanColumn/KanbanColumn";

const KanbanDesk: FC = () => {
    return (
        <div className={cls.kanbanDesk}>
            <KanbanColumn
                title={'To Do'}
                kanbanVar={kanbanColumnsVar.TODO}
                className={cls.toDoBlock}
            >
            </KanbanColumn>
            
            <KanbanColumn
                title={'In Progress'}
                kanbanVar={kanbanColumnsVar.PROGRESS}
                className={cls.inProgressBlock}>

            </KanbanColumn>

            <KanbanColumn
                title={'Need Review'}
                kanbanVar={kanbanColumnsVar.REVIEW}
                className={cls.needReviewBlock}
            >
            </KanbanColumn>

            <KanbanColumn
                title={'Done'}
                kanbanVar={kanbanColumnsVar.DONE}
                className={cls.doneBlock}
            >
            </KanbanColumn>
        </div>
    )
}

export default KanbanDesk
