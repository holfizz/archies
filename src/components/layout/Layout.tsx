import {FC} from "react";
import cls from './Layout.module.scss'
import NavMenu from "./navMenu/NavMenu";
import Header from "./header/Header";

const Layout: FC = () => {
    return (
        <div className={cls.Layout}>
            <Header/>
            <NavMenu/>
        </div>
    )
}

export default Layout
