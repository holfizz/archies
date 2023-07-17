import {Dispatch, FC, useEffect, useState} from "react";
import cls from './Layout.module.scss'
import NavMenu from "./navMenu/NavMenu";
import Header from "./header/Header";

interface LayoutProps {
    setSearch: Dispatch<string>
}

const Layout: FC<LayoutProps> = ({setSearch}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    useEffect(() => {
        setSearch(searchQuery)
    }, [searchQuery])
    return (
        <div className={cls.Layout}>
            <Header setSearchQuery={setSearchQuery}/>
            <NavMenu/>
        </div>
    )
}

export default Layout
