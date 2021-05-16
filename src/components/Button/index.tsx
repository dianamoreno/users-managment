import React from 'react';
import {ButtonProps} from '../../interfaces/Button/'
import '../../styles/button.css';

export const Button: React.FC<ButtonProps> = (props) => {
    const style = props.type;
    return (
        <button className={style} onClick={props.onButtonClick}>{props.children}</button>
    )
}

