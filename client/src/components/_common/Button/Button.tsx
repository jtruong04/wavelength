import React from 'react';
import './Button.css';
export interface ButtonProps {
    onClick: (event: React.MouseEvent | React.TouchEvent) => void;
    grayscale?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    onClick,
    grayscale,
    children,
}) => {
    const handleClick = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        onClick(event);
    };

    return (
        <button
            className={`button ${grayscale ? 'grayscale' : ''}`}
            onClick={handleClick}
        >
            <div>{children}</div>
        </button>
    );
};

export default Button;
