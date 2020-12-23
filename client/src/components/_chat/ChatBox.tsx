// LIbraries
import React from 'react';
import styled from 'styled-components';
// Recoil
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { MyIDAtom } from 'atoms/user';
import { ChatAtom } from 'atoms/chat';
// Components
import MessageList from './MessageList';
import TextInput from 'components/_common/TextInput/TextInput';
import Card from 'components/_common/Card';
// Services
// Types
import { TextInputForm } from 'components/_common/TextInput';

const StyledChatBox = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-content: stretch;
    align-items: stretch;
    padding: 5%;
    max-width: 600px;
    width: 100%;
    height: 100%;
    background-color: #ffffffee;
`;

export interface ChatBoxProps {}

export const ChatBox = () => {
    const setMessages = useSetRecoilState(ChatAtom);
    const myid = useRecoilValue(MyIDAtom);

    const onSubmit = (data: TextInputForm) => {
        // socket.emit(ChatEvent.MESSAGE);
        setMessages((messages) => [
            {
                userid: myid,
                body: data.input,
            },
            ...messages,
        ]);
    };

    // useEffect(() => {
    //     socket.on(ChatEvent.MESSAGE, (msg: IMessage) => {
    //         setMessages((messages) => [msg, ...messages]);
    //     });
    //     return () => {
    //         socket.off(ChatEvent.MESSAGE);
    //     };
    // }, [setMessages]);

    return (
        <StyledChatBox>
            <MessageList />
            <TextInput onSubmit={onSubmit} />
        </StyledChatBox>
    );
};

export default ChatBox;
