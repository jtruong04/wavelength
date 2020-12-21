// LIbraries
import React, { useEffect } from 'react';
import styled from 'styled-components';
// Recoil
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Me, MyTeamState } from 'atoms/user';
import { ChatState } from 'atoms/chat';
// Components
import MessageList from './MessageList';
import TextInput from 'components/_common/TextInput/TextInput';
import Card from 'components/_common/Card';
// Services
import socket from 'services/socket';
// Types
import { IMessage } from 'types';
import { ChatEvent } from 'enums';
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
    const setMessages = useSetRecoilState(ChatState);
    const me = useRecoilValue(Me);
    const myTeam = useRecoilValue(MyTeamState);

    const onSubmit = (data: TextInputForm) => {
        socket.emit(ChatEvent.MESSAGE, {
            ...me,
            color: myTeam.color,
            body: data.input,
        });
    };

    useEffect(() => {
        socket.on(ChatEvent.MESSAGE, (msg: IMessage) => {
            setMessages((messages) => [...messages, msg]);
        });
        return () => {
            socket.off(ChatEvent.MESSAGE);
        };
    }, [setMessages]);

    return (
        <StyledChatBox>
            <MessageList />
            <TextInput onSubmit={onSubmit} />
        </StyledChatBox>
    );
};

export default ChatBox;
