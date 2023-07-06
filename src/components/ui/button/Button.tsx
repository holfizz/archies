import {FC, ReactNode} from "react";
import cls from './Button.module.scss';

export enum ButtonStyle {
    CLEAR = 'clear',
    PRIMARY_DARK = 'primary-dark',
    PRIMARY_LIGHT = 'primary-light',
    DASHED_DARK = 'dashed-dark',
    DASHED_LIGHT = 'dashed-light',
    FILL = 'fill'
}

interface ButtonInterface {
    children?: ReactNode;
    onClick?: () => void;
    buttonStyle: ButtonStyle;
    className?: string | string[];
}

const Button: FC<ButtonInterface> = ({children, onClick, buttonStyle, className}) => {
    return (
        <button
            onClick={onClick}
            className={[className, cls.button, buttonStyle && cls[buttonStyle]].join(' ')}
        >
            {children}
        </button>
    );
}

export default Button;