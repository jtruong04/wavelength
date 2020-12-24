import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

const LoadingContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
    return (
        <LoadingContainer>
            <ReactLoading type='bars' />
        </LoadingContainer>
    );
};

export default Loading;
