import React from 'react';
import './Button.css';
export interface ButtonProps {
    onClick: (event: React.MouseEvent | React.TouchEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
    const handleClick = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        onClick(event);
    };

    return (
        <button className='button' onClick={handleClick}>
            <div>{children}</div>
        </button>
    );
};

export default Button;
