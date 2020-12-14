// Libraries
import React from 'react';
// Components
import Message from '../Message/Message';
// Types
import { Message as IMessage } from 'types';
// Styling
import './Chat.css';

export type MessageListProps = {
    messages: IMessage[];
    userID: string;
};

export default function MessageList({ messages, userID }: MessageListProps) {
    const renderMessages = () => {
        return messages.map((msg, idx) => (
            <Message msg={msg} isMe={msg.user === userID} key={idx} />
        ));
    };

    return (
        <div className='message-box'>
            <div>{renderMessages()}</div>
        </div>
    );
}
