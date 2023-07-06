import React, {FC, useState} from "react";
import cls from "./KanbantCard.module.scss";
import {PiListChecksBold,} from "react-icons/pi";
import {BsChatSquareDots, BsThreeDotsVertical,} from "react-icons/bs";
import {AiOutlineEye} from "react-icons/ai";
import {FiPaperclip} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers";
import {GrFormClose} from "react-icons/gr";
import Button, {ButtonStyle} from "../button/Button";
import {deleteTask} from "../../../store/reducers/taskSlice";

interface card {
    title: string;
    description: string;
    status: string;
}

interface KanbanCardProps {
    status: string;
}

const KanbanCard: FC<KanbanCardProps> = ({status}) => {
    const tasksDefault = useSelector(
        (state: RootState) => state.task.tasks
    );

    const dispatch = useDispatch()

    const filteredTasks = tasksDefault.filter((card: card) =>
        status ? card.status === status : true
    );

    const [modalStates, setModalStates] = useState(
        filteredTasks.map((_) => false)
    );

    const openModal = (index: number) => {
        setModalStates((prev) =>
            prev.map((state, i) => (i === index ? true : state))
        );
    };

    const closeModal = (index: number) => {
        setModalStates((prev) =>
            prev.map((state, i) => (i === index ? false : state))
        );
    };

    return (
        <div>
            {filteredTasks.map((item: card, index: number) => {
                return (
                    <div key={index}
                         className={cls.card}>
                        <div className={cls.cardCategoryTitle}>
                            <div className={cls.category}>UX stages</div>
                            <div onClick={() => openModal(index)}>
                                <BsThreeDotsVertical/>
                            </div>
                        </div>
                        <h1 className={cls.cardTitle}>{item.title}</h1>
                        <div className={cls.cardBlockParagraph}>
                            <p className={cls.cardDescription}>{item.description}</p>
                        </div>
                        <div className={cls.taskCompleteBlock}>
                            <PiListChecksBold/>
                            0/8
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

                        {modalStates[index] && (
                            <div className={cls.modal}>
                                <div className={cls.modalContent}>
                                    <div className={cls.closeModal}
                                         onClick={() => {
                                             closeModal(index)
                                         }}
                                    >
                                        <GrFormClose/>
                                    </div>
                                    <div className={cls.modalBody}>
                                        <Button onClick={() => {
                                            closeModal(index)
                                            dispatch(deleteTask(item))
                                        }} buttonStyle={ButtonStyle.CLEAR}
                                                className={cls.buttonDelete}
                                        >Delete</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default KanbanCard;