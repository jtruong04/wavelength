import styled from 'styled-components';

const Card = styled.div`
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: rgba(0, 0, 0, 0.87);
`;

export default Card;