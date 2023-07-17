import React, {FC, useState} from "react";
import cls from "./KanbantCard.module.scss";
import {PiListChecksBold} from "react-icons/pi";
import {BsChatSquareDots, BsThreeDotsVertical} from "react-icons/bs";
import {AiOutlineEye} from "react-icons/ai";
import {FiPaperclip} from "react-icons/fi";
import {GrFormClose} from "react-icons/gr";
import Button, {ButtonStyle} from "../button/Button";
import {Draggable} from "react-beautiful-dnd";
import {TaskSliceProps} from "../../../store/reducers/taskSlice";
import CardInfModal from "../modals/CardInfModal";

interface KanbanCardProps {
    tasks: TaskSliceProps[];
    onDeleteTask: (task: TaskSliceProps, status: string, taskId: string) => void;
    typeBoard: string
}

const KanbanCard: FC<KanbanCardProps> = ({tasks, onDeleteTask, typeBoard}) => {
    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState<string | null>(null);

    const handleModalToggle = (index: number) => {
        setOpenModalIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleTaskClick = (title: string) => {
        setSelectedTaskIndex((prevTitle) => (prevTitle === title ? null : title));
    };
    return (
        <div className={[typeBoard === 'list' && cls.list].join(' ')}>
            {tasks.map((item: TaskSliceProps, index: number) => {
                return (
                    <div>
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                                <>
                                    <div
                                        key={item.id}
                                        className={cls.card}
                                        onClick={() => handleTaskClick(item.title)}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <div className={cls.cardCategoryTitle}>
                                            <div className={cls.category}>UX stages</div>
                                            <div
                                                className={cls.deleteTask}
                                                onClick={(e: any) => {
                                                    e.stopPropagation();
                                                    handleModalToggle(index);
                                                }}
                                            >
                                                <BsThreeDotsVertical/>
                                            </div>
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

                                        {openModalIndex === index && (
                                            <div className={cls.modal}>
                                                <div className={cls.modalContent}>
                                                    <div
                                                        className={cls.closeModal}
                                                        onClick={(e: any) => {
                                                            e.stopPropagation();
                                                            handleModalToggle(index);
                                                        }}
                                                    >
                                                        <GrFormClose/>
                                                    </div>
                                                    <div className={cls.modalBody}>
                                                        <Button
                                                            onClick={() => {
                                                                handleModalToggle(index);
                                                                setSelectedTaskIndex(null)
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
                                    {snapshot.isDragging ? <div
                                        className={[typeBoard === 'list' ? cls.listCloneCard : cls.cloneCard].join(' ')}>

                                    </div> : null}
                                </>
                            )}
                        </Draggable>
                        {selectedTaskIndex === item.title && (
                            <CardInfModal
                                visible={true}
                                setVisible={setSelectedTaskIndex}
                                title={item.title}
                                description={item.description}
                                list={item.list}
                                status={item.status}
                                id={item.id}
                            />
                        )}
                    </div>

                );
            })}

        </div>
    );
};

export default KanbanCard;