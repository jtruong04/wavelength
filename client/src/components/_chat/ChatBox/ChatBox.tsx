// LIbraries
import React, { useEffect } from 'react';
// Material
import { Card, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// Recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserIDState } from 'atoms/user';
import { ChatState } from 'atoms/chat';
import { RoomState } from 'atoms/room';
// Components
import MessageList from '../MessageList/MessageList';
import Input from '../../_common/TextInput/TextInput';
// Services
import socket from 'services/socket';
// Types
import { UserID } from 'types';
import { ChatEvent } from 'enums';
import { TextInputForm } from 'components/_common/TextInput';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-end',
            padding: '10px',
            maxWidth: '600px',
            width: '90%',
            height: '90%',
            margin: '5%',
            backgroundColor: '#FFFFFFEE',
        },
    })
);

export default function ChatBox() {
    const classes = useStyles();

    const [messages, setMessages] = useRecoilState(ChatState);
    const userid = useRecoilValue(UserIDState);
    const room = useRecoilValue(RoomState);
    const onSubmit = (data: TextInputForm) => {
        socket.emit(ChatEvent.MESSAGE, { userid, body: data.input });
    };

    useEffect(() => {
        socket.on(ChatEvent.MESSAGE, (user: UserID, body: string) => {
            setMessages((messages) => [...messages, { user, body }]);
        });
        return () => {
            socket.off(ChatEvent.MESSAGE);
        };
    }, [setMessages]);

    return (
        <Card className={classes.root}>
            <Typography align="right">{room}</Typography>
            <MessageList messages={messages} userID={userid} />
            <Input onSubmit={onSubmit} />
        </Card>
    );
}
