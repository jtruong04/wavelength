// Libraries
import React from 'react';
// Recoil
import { useRecoilValue } from 'recoil';
import { ChatState } from 'atoms/chat';
// Components
import Message from '../Message/Message';
// Types
import { MessageProps } from '../Message';
// Styling
import '../Chat.css';
import { UserIDState } from 'atoms/user';

export type MessageListProps = {
    messages: MessageProps[];
};

export const MessageList = ({ messages }: MessageListProps) => {
    const renderMessages = () => {
        return messages.map((msg, idx) => <Message {...msg}  key={idx} />);
    };

    return (
        <div className='message-box'>
            <div>{renderMessages()}</div>
        </div>
    );
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
