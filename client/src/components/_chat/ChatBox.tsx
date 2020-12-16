// LIbraries
import React, { useEffect } from 'react';
// Material
import { Card, Typography } from '@material-ui/core';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// Recoil
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Me, MyTeamState } from 'atoms/user';
import { ChatState } from 'atoms/chat';
import { RoomState } from 'atoms/room';
// Components
import MessageList from './MessageList';
import TextInput from 'components/_common/TextInput/TextInput';
// Services
import socket from 'services/socket';
// Types
import { IMessage } from 'types';
import { ChatEvent } from 'enums';
import { TextInputForm } from 'components/_common/TextInput';

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'flex-end',
//             alignContent: 'stretch',
//             alignItems: 'stretch',
//             padding: '5%',
//             maxWidth: '600px',
//             width: '100%',
//             height: '100%',
//             backgroundColor: '#FFFFFFEE',
//         },
//     })
// );

export interface ChatBoxProps {}

export const ChatBox = () => {
    // const classes = useStyles();

    const setMessages = useSetRecoilState(ChatState);
    const me = useRecoilValue(Me);
    const myTeam = useRecoilValue(MyTeamState);
    const room = useRecoilValue(RoomState);

    const onSubmit = (data: TextInputForm) => {
        socket.emit(ChatEvent.MESSAGE, {
            ...me,
            color: myTeam.color,
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
        // <Card className={classes.root}>
        <Card className='chat-box'>
            <Typography align='right'>Room Code: {room}</Typography>
            <MessageList />
            <TextInput onSubmit={onSubmit} />
        </Card>
    );
};

export default ChatBox;
