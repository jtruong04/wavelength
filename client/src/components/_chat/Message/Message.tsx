// Libraries
import React from 'react';
import styled from 'styled-components';
// Components
import Avatar from 'components/_common/Avatar';
import Typography from 'components/_common/Typography';
import Card from 'components/_common/Card';

const Nameplate = styled(Typography)`
    font-size: 10px;
`;

const MessageBody = styled(Typography)`
    font-size: 1rem;
`;

const BodyContainer = styled(Card)`
    margin-left: 0.5em;
    margin-right: 0.5em;
    border-bottom-right-radius: ${(props: { isMine: boolean }) =>
        props.isMine ? '0' : '10px'};
    border-bottom-left-radius: ${(props: { isMine: boolean }) =>
        props.isMine ? '10px' : '0'};
    background-color: ${(props: { isMine: boolean }) =>
        props.isMine ? 'lightblue' : '#DDDDDD'};
    align-content: left;
    text-align: left;
`;

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    flex-direction: ${(props: { isMine: boolean }) =>
        props.isMine ? 'row-reverse' : 'row'};
`;

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

const Message: React.FC<MessageProps> = ({
    name = '',
    avatar = undefined,
    color = '#808080',
    body,
    isMine = false,
}) => {
    // const classes = useStyles({ name, avatar, color, body, isMine });

    return (
        <Container isMine={isMine}>
            <Avatar name={name} avatar={avatar} color={color} />
            <BodyContainer isMine={isMine}>
                <Nameplate>{name}</Nameplate>
                <MessageBody>{body}</MessageBody>
            </BodyContainer>
        </Container>
    );
};

export default Message;
