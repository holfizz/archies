import React, {FC, useState} from "react";
import cls from './NavMenu.module.scss'
import {BsPersonFill} from 'react-icons/bs'
import {GoColumns} from 'react-icons/go'
import {GrAppsRounded, GrCircleQuestion} from 'react-icons/gr'
import {RiTimerLine} from 'react-icons/ri'
import {LuCalendarDays} from 'react-icons/lu'
import {IoStatsChart} from 'react-icons/io5'
import {PiChatsCircleBold} from 'react-icons/pi'
import {HiOutlineLogout} from 'react-icons/hi'
import NavBarPages from "../../navBarPages/NavBarPages";
import ProjectCard from "../../ui/projectCard/ProjectCard";

const NavMenu: FC = () => {
    const [activeElement, setActiveElement] = useState<string>('li1');
    const projects = !localStorage.getItem('projects') ? [] : JSON.parse(localStorage?.getItem('projects') || '')


    return (
        <div className={cls.NavMenu}>
            <div className={cls.navBar}>
                <div className={cls.profileButton}>
                    <button>
                        <BsPersonFill/>
                    </button>
                </div>
                <div className={cls.navBlock}>
                    <button
                        className={[cls.navButton, activeElement === 'li1' && cls.active].join(' ')}
                        onMouseMove={() => setActiveElement('li1')}
                    >
                        <GrAppsRounded/>
                        {activeElement === 'li1' && <div className={cls.navButtonActive}></div>}

                    </button>
                    <button
                        className={[cls.navButton, activeElement === 'li2' && cls.active].join(' ')}
                        onMouseMove={() => setActiveElement('li2')}
                    >
                        <GoColumns/>
                        {activeElement === 'li2' && <div className={cls.navButtonActive}></div>}


                    </button>
                    <button
                        className={[cls.navButton, activeElement === 'li3' && cls.active].join(' ')}
                        onMouseMove={() => setActiveElement('li3')}
                    >
                        <RiTimerLine/>
                        {activeElement === 'li3' && <div className={cls.navButtonActive}></div>}


                    </button>
                    <button
                        className={[cls.navButton, activeElement === 'li4' && cls.active].join(' ')}
                        onMouseMove={() => setActiveElement('li4')}
                    >
                        <LuCalendarDays/>
                        {activeElement === 'li4' && <div className={cls.navButtonActive}></div>}


                    </button>
                    <button
                        className={[cls.navButton, activeElement === 'li5' && cls.active].join(' ')}
                        onMouseMove={() => setActiveElement('li5')}
                    >
                        <IoStatsChart/>
                        {activeElement === 'li5' && <div className={cls.navButtonActive}></div>}

                    </button>
                    <button
                        className={[cls.navButton, activeElement === 'li6' && cls.active].join(' ')}
                        onMouseMove={() => setActiveElement('li6')}
                    >
                        <PiChatsCircleBold/>
                        {activeElement === 'li6' && <div className={cls.navButtonActive}></div>}


                    </button>
                    <button
                        className={[cls.navButton, activeElement === 'li7' && cls.active].join(' ')}
                        onMouseMove={() => setActiveElement('li7')}>
                        <GrCircleQuestion/>
                        {activeElement === 'li7' && <div className={cls.navButtonActive}></div>}


                    </button>
                </div>
                <button className={cls.buttonLogout}>
                    <HiOutlineLogout/>
                </button>
            </div>
            <div className={cls.navMenu}>
                {
                    activeElement === 'li1' && <NavBarPages title={'apps'}/>
                }
                {
                    activeElement === 'li2' &&
                    <NavBarPages title={'Projects'}>
                        <ProjectCard projects={projects}></ProjectCard>
                    </NavBarPages>
                }
                {
                    activeElement === 'li3' &&
                    <NavBarPages title={'Time'}>

                    </NavBarPages>
                }
                {
                    activeElement === 'li4' &&
                    <NavBarPages title={'Calendar'}>

                    </NavBarPages>
                }
                {
                    activeElement === 'li5' &&
                    <NavBarPages title={'Statistics'}>

                    </NavBarPages>
                }
                {
                    activeElement === 'li6' &&
                    <NavBarPages title={'Chat'}>

                    </NavBarPages>
                }
                {
                    activeElement === 'li7' &&
                    <NavBarPages title={'Questions'}>

                    </NavBarPages>
                }

            </div>
        </div>
    )
}

export default NavMenu
