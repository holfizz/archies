import {ChangeEvent, FC} from "react";
import cls from './Input.module.scss';

export enum InputStyle {
    PRIMARY = 'primary',
    GRAY = 'gray'
}

interface InputInterface {
    placeholder: string;
    type: string;
    value?: any;
    onChange?: (value: string) => void;
    className?: string;
    inputStyle: InputStyle;

}

const Input: FC<InputInterface> = ({placeholder, type, value, onChange, className, inputStyle}) => {
    return (
        <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange ? onChange(e.target.value) : ''}
            className={[className, cls.Input, inputStyle && cls[inputStyle]].join(' ')}
            value={value}
            placeholder={placeholder}
            type={type}

        />
    );
}

export default Input;