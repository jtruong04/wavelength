// Libraries
import React from 'react';
// Material
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Card } from '@material-ui/core';
// Components
import Avatar from 'components/Avatar';
// Types
import { Message as IMessage } from 'types';
import { useRecoilValue } from 'recoil';
import { PlayerState } from 'atoms/user';

export interface MessageProps {
    msg: IMessage;
    isMe: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: (props: MessageProps) => ({
            padding: 10,
            marginLeft: '10px',
            marginRight: '10px',
            borderRadius: 10,
            borderBottomRightRadius: props.isMe ? 0 : 10,
            borderBottomLeftRadius: props.isMe ? 10 : 0,
            background: props.isMe ? 'lightblue' : '#DDDDDD',
            alignContent: 'left',
            textAlign: 'left',
        }),
        title: {
            fontSize: 10,
        },
        root: (props: MessageProps) => ({
            display: 'flex',
            alignItems: 'flex-end',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
            flexDirection: props.isMe ? 'row-reverse' : 'row',
        }),
        body: {
            alignContent: 'left',
        },
    })
);

const Message: React.FC<MessageProps> = ({ msg, isMe }) => {
    const classes = useStyles({ msg, isMe });
    const user = useRecoilValue(PlayerState(msg.user || ''));

    return (
        <div className={classes.root}>
            <Avatar {...user} />
            <Card className={classes.card}>
                <Typography className={classes.title}>
                    {user?.name || ''}
                </Typography>
                <Typography className={classes.body}>{msg.body}</Typography>
            </Card>
        </div>
    );
};

export default Message;
