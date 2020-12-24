import React from 'react';
import styled from 'styled-components';
import Color from 'color';
export interface ButtonProps {
    onClick: (event: React.MouseEvent | React.TouchEvent) => void;
    color?: string;
}
const StyledButton = styled.button`
    position: relative;
    display: inline-block;
    background-color: ${(props: { color: string }) => props.color};
    border: none;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
    font-size: 24px;
    text-transform: uppercase;
    color: white;
    text-shadow: 0px 1px 0px #000;
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 10px;
    margin-top: 10px;
    filter: dropshadow(color=#000, offx=0px, offy=1px);
    box-shadow: ${(props: { color: string }) =>
        `inset 0 1px 0 #ffe5c4, 0 10px 0 ${Color(props.color)
            .darken(0.5)
            .hex()}`};
    border-radius: 5px;

    &:focus {
        background-color: ${(props: { color: string }) =>
            Color(props.color).lighten(0.1).hex()};
        outline: none;
    }

    &:hover {
        background-color: ${(props: { color: string }) =>
            Color(props.color).lighten(0.2).hex()};
        outline: none;
    }
    &:active {
        top: 10px;
        background-color: ${(props: { color: string }) =>
            Color(props.color).darken(0.1).hex()};
        box-shadow: ${(props: { color: string }) =>
            `inset 0 1px 0 #ffe5c4, inset 0 -3px 0 ${Color(props.color)
                .darken(0.5)
                .hex()}`};
    }
`;

export const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    color = '#ffa12b',
}) => {
    const handleClick = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        onClick(event);
    };

    return (
        <StyledButton color={color} onClick={handleClick}>
            <div>{children}</div>
        </StyledButton>
    );
};

export default Button;
