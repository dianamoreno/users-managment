import React from 'react';
import {ButtonProps} from '../../interfaces/Button/'
import '../../styles/index.css';

export const Button: React.FC<ButtonProps> = (props) => {
    const style = props.type;
    return (
        <button className={style} onClick={props.onButtonClick}>{props.children}</button>
    )
}

