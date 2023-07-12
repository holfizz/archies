import React, {FC, useState} from "react";
import cls from "./KanbantCard.module.scss";
import {PiListChecksBold,} from "react-icons/pi";
import {BsChatSquareDots, BsThreeDotsVertical,} from "react-icons/bs";
import {AiOutlineEye} from "react-icons/ai";
import {FiPaperclip} from "react-icons/fi";
import {GrFormClose} from "react-icons/gr";
import Button, {ButtonStyle} from "../button/Button";
import {Draggable} from "react-beautiful-dnd";
import {TaskSliceProps} from "../../../store/reducers/taskSlice";


interface KanbanCardProps {
    status: string;
    tasks: TaskSliceProps[];
    onDeleteTask: (task: TaskSliceProps, status: string, taskId: string) => void
}

const KanbanCard: FC<KanbanCardProps> = ({status, tasks, onDeleteTask}) => {
    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

    const handleModalToggle = (index: number) => {
        setOpenModalIndex(openModalIndex === index ? null : index);
    };

    return (
        <div>
            {tasks.map((item: TaskSliceProps, index: number) => {
                return (
                    <Draggable key={index} draggableId={(index).toString()} index={index}>
                        {(provided) => (
                            <div key={index}
                                 draggable={true}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                 ref={provided.innerRef}
                            >
                                <div className={cls.card}>
                                    <div className={cls.cardCategoryTitle}>
                                        <div className={cls.category}>UX stages</div>
                                        <div className={cls.deleteTask} onClick={() => {
                                            handleModalToggle(index);
                                        }}>
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

                                    {openModalIndex === index && (
                                        <div className={cls.modal}>
                                            <div className={cls.modalContent}>
                                                <div
                                                    className={cls.closeModal}
                                                    onClick={() => handleModalToggle(index)}
                                                >
                                                    <GrFormClose/>
                                                </div>
                                                <div className={cls.modalBody}>
                                                    <Button
                                                        onClick={() => {
                                                            handleModalToggle(index);
                                                            onDeleteTask(item, item.status, item.id);
                                                        }}
                                                        buttonStyle={ButtonStyle.CLEAR}
                                                        className={cls.buttonDelete}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </Draggable>
                );
            })}
        </div>
    );
};
export default KanbanCard