// Libraries
import React from 'react';
// Material
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Card } from '@material-ui/core';
// Components
import Avatar from 'components/_common/Avatar';

export interface MessageProps {
    /**
     * Name
     */
    name?: string;
    /**
     * Avatar index number
     */
    avatar?: number;
    /**
     * Background for avatar
     */
    color?: string;
    /**
     * Body
     */
    body: string;
    /**
     * Is the message from me?
     */
    isMine?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: (props: MessageProps) => ({
            padding: 10,
            marginLeft: '5%',
            marginRight: '5%',
            borderRadius: 10,
            borderBottomRightRadius: props.isMine ? 0 : 10,
            borderBottomLeftRadius: props.isMine ? 10 : 0,
            background: props.isMine ? 'lightblue' : '#DDDDDD',
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
            flexDirection: props.isMine ? 'row-reverse' : 'row',
        }),
        body: {
            alignContent: 'left',
        },
    })
);

const Message: React.FC<MessageProps> = ({
    name = '',
    avatar = undefined,
    color = '#808080',
    body,
    isMine = false,
}) => {
    const classes = useStyles({ name, avatar, color, body, isMine });

    return (
        <div className={classes.root}>
            <Avatar name={name} avatar={avatar} color={color} />
            <Card className={classes.card}>
                <Typography className={classes.title}>{name}</Typography>
                <Typography className={classes.body}>{body}</Typography>
            </Card>
        </div>
    );
};

// export const MessageContainer = () => {};

export default Message;
