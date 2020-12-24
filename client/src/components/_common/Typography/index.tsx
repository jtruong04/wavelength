import styled, { css } from 'styled-components';

const Typography = styled.p`
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    letter-spacing: 0.00938em;
    line-height: 1.5;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    margin: 0;
    ${(props: { size?: string }) =>
        props.size &&
        css`
            font-size: ${props.size};
        `}
    ${(props: { color?: string }) =>
        props.color &&
        css`
            color: ${props.color};
        `}
`;

export default Typography;
