import React, {FC} from "react";
import cls from './KanbanDesk.module.scss'
import HeaderKanbanDesk from "../haederKanbanDesk/HeaderKanbanDesk";
import KanbanColumn, {kanbanColumnsVar} from "../ui/kanbanColumn/KanbanColumn";
// import KanbanColumn, {kanbanColumnsVar} from "../ui/kanbanColumn/KanbanColumn";

const KanbanDesk: FC = () => {
    return (
        <div className={cls.kanbanDesk}>
            <HeaderKanbanDesk></HeaderKanbanDesk>
            <div className={cls.desk}>
                <KanbanColumn
                    statusColumn={'todo'}
                    titleColumn={'To Do'}
                    kanbanVar={kanbanColumnsVar.TODO}
                    className={cls.toDoBlock}
                >
                </KanbanColumn>

                <KanbanColumn
                    statusColumn={'progress'}
                    titleColumn={'In Progress'}
                    kanbanVar={kanbanColumnsVar.PROGRESS}
                    className={cls.inProgressBlock}>

                </KanbanColumn>

                <KanbanColumn
                    statusColumn={'review'}
                    titleColumn={'Need Review'}
                    kanbanVar={kanbanColumnsVar.REVIEW}
                    className={cls.needReviewBlock}
                >
                </KanbanColumn>

                <KanbanColumn
                    statusColumn={'done'}
                    titleColumn={'Done'}
                    kanbanVar={kanbanColumnsVar.DONE}
                    className={cls.doneBlock}
                >
                </KanbanColumn>
            </div>
        </div>
    )
}

export default KanbanDesk
