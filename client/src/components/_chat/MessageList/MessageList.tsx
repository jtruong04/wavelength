// Libraries
import React from 'react';
import styled from 'styled-components';
// Recoil
import { useRecoilValue } from 'recoil';
import { ChatAtom } from 'atoms/chat';
// Components
import Message from '../Message';
// Types
import { UserID } from 'types';

const MessageBox = styled.div`
    overflow-y: scroll;
    display: flex;
    height: 100%;
    flex-direction: column-reverse;
    /* justify-content: flex-end; */
    flex: 1 1 auto;
    padding: 0;
    /* max-height: 50vh; */
`;

export type MessageListProps = {
    /**
     * List of messages
     */
    messages: { userid: UserID; body: string }[];
};

export const MessageList = ({ messages }: MessageListProps) => {
    const renderMessages = () => {
        return messages.map((msg, idx) => <Message {...msg} key={idx} />);
    };

    return <MessageBox>{renderMessages()}</MessageBox>;
};

const MessageListContainer = () => {
    const messages = useRecoilValue(ChatAtom);
    const processedMessages = messages.map((msg) => ({
        ...msg,
    }));
    return <MessageList messages={processedMessages} />;
};

export default MessageListContainer;
