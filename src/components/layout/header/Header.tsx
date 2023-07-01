import {FC} from "react";
import Input, {InputStyle} from "../../ui/input/Input";
import {RiSettings4Line} from "react-icons/ri";
import cls from './Header.module.scss'
import {MdOutlineNotificationsActive, MdOutlineNotificationsNone} from "react-icons/md";
import {FiSearch} from "react-icons/fi";

const Header: FC = () => {
    return (
        <div className={cls.header}>
            <div className={cls.search}>
                <FiSearch/>
                <Input placeholder={'Search'} type={'text'} inputStyle={InputStyle.GRAY}/>
            </div>
            <div className={cls.headerController}>

                <div className={cls.profile}>
                    <RiSettings4Line/>
                    {'1' === '1' ?
                        <MdOutlineNotificationsNone/>
                        :
                        <MdOutlineNotificationsActive/>
                    }
                    <div className={cls.avatar}></div>
                    <h3 className={cls.profileName}>Alison Haper</h3>
                </div>
            </div>
        </div>
    )
}

export default Header
