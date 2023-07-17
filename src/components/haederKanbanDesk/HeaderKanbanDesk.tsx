import React, {Dispatch, FC, useEffect, useState} from "react";
import cls from './HeaderKanbanDesk.module.scss'
import {RiDatabaseLine} from "react-icons/ri";
import Button, {ButtonStyle} from "../ui/button/Button";
import {BsPlus} from "react-icons/bs";
import {PiListChecksBold} from "react-icons/pi";
import {GoColumns} from "react-icons/go";

interface HeaderKanbanDeskProps {
    lengthTasks: number
    lengthDone: number,
    setTypeBoard: Dispatch<string>
}

const HeaderKanbanDesk: FC<HeaderKanbanDeskProps> = ({lengthTasks, lengthDone, setTypeBoard}) => {
    const [selectionMode, setSelectionMode] = useState<string>('1')
    const [typeController, setTypeController] = useState<string>('board')
    const doneFunc = () => {
        const percent = lengthDone / lengthTasks * 100;
        return percent.toFixed(0);
    };
    useEffect(() => {
        setTypeBoard(typeController)
    }, [typeController])
    return (
        <div className={cls.headerKanbanDesk}>
            <div>
                <div className={cls.titleHeaderKanbanDesk}>
                    <div className={cls.dataBlock}>
                        <div className={cls.storageBlocks}>
                            <div className={cls.data}><RiDatabaseLine/></div>
                            <h1 className={cls.dataBlockTitle}>Title</h1>
                        </div>
                        <div className={cls.storageBlocks}>
                            <div className={cls.storageFill}>
                                <div className={cls.storageFree}></div>
                                <div style={{width: Number(doneFunc()) > 0 ? doneFunc() + '%' : '0%'}}
                                     className={cls.storageFilled}></div>
                            </div>
                            <h3 className={cls.titleComplete}>Complete {Number(doneFunc()) > 0 ? doneFunc() + '%' : '0%'}</h3>
                        </div>
                    </div>
                    <div className={cls.selectionModeBlock}>
                        <div onClick={() => setSelectionMode('1')} className={cls.blockSelectionModeButton}>
                            <Button
                                className={cls.buttonSelectionMode}
                                buttonStyle={ButtonStyle.CLEAR}>Overview</Button>
                            {selectionMode === '1' && <div className={cls.activeButtonSelectionMode}></div>}
                        </div>
                        <div onClick={() => setSelectionMode('2')} className={cls.blockSelectionModeButton}>
                            <Button
                                className={cls.buttonSelectionMode}
                                buttonStyle={ButtonStyle.CLEAR}>Tasks</Button>
                            {selectionMode === '2' && <div className={cls.activeButtonSelectionMode}></div>}
                        </div>
                        <div onClick={() => setSelectionMode('3')} className={cls.blockSelectionModeButton}>
                            <Button
                                className={cls.buttonSelectionMode}
                                buttonStyle={ButtonStyle.CLEAR}>Notes</Button>
                            {selectionMode === '3' && <div className={cls.activeButtonSelectionMode}></div>}
                        </div>
                        <div onClick={() => setSelectionMode('4')} className={cls.blockSelectionModeButton}>
                            <Button
                                className={cls.buttonSelectionMode}
                                buttonStyle={ButtonStyle.CLEAR}>Questions</Button>
                            {selectionMode === '4' && <div className={cls.activeButtonSelectionMode}></div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cls.controller}>
                <div className={cls.membersControllers}>
                    <div className={cls.users}>
                        <div className={[cls.user, cls.user_one].join(' ')}></div>
                        <div className={[cls.user, cls.user_two].join(' ')}></div>
                        <div className={[cls.user, cls.user_three].join(' ')}></div>
                    </div>
                    <Button buttonStyle={ButtonStyle.PRIMARY_LIGHT}><BsPlus/>Add Member</Button>

                </div>
                <div className={cls.typeKanbanController}>
                    <button onClick={() => setTypeController('board')}
                            className={[cls.typeControllerButton, typeController === 'board' && cls.active].join(' ')}>
                        <GoColumns/>Board
                    </button>

                    <button onClick={() => setTypeController('list')}
                            className={[cls.typeControllerButton, typeController === 'list' && cls.active].join(' ')}>
                        <PiListChecksBold/>List
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeaderKanbanDesk
