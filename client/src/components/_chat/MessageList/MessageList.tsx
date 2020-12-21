// Libraries
import React from 'react';
import styled from 'styled-components';
// Recoil
import { useRecoilValue } from 'recoil';
import { ChatState } from 'atoms/chat';
import { UserIDState } from 'atoms/user';
// Components
import Message from '../Message';
// Types
import { MessageProps } from '../Message';

const MessageBox = styled.div`
    overflow-y: scroll;
    display: flex;
    height: 100%;
    flex-direction: column-reverse;
    flex: 1 1 auto;
    padding: 0;
`;

export type MessageListProps = {
    /**
     * List of messages
     */
    messages: MessageProps[];
};

export const MessageList = ({ messages }: MessageListProps) => {
    const renderMessages = () => {
        return messages.map((msg, idx) => <Message {...msg} key={idx} />);
    };

    return <MessageBox>{renderMessages()}</MessageBox>;
};

const MessageListContainer = () => {
    const messages = useRecoilValue(ChatState);
    const userid = useRecoilValue(UserIDState);

    const processedMessages = messages.map((msg) => ({
        ...msg,
        isMine: msg.id === userid,
    }));
    return <MessageList messages={processedMessages} />;
};

export default MessageListContainer;
