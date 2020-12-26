// Libraries
import React from 'react';
import styled from 'styled-components';
// Components
import Avatar from 'components/_common/Avatar';
import Typography from 'components/_common/Typography';
import Card from 'components/_common/Card';
import { useRecoilValue } from 'recoil';
import { MyIDAtom, PlayerAtom, PlayerTeamSelector } from 'atoms/user';
import { UserID } from 'types';
import { TeamAtom } from 'atoms/team';

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
    avatarid?: number;
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

export const Message: React.FC<MessageProps> = ({
    name = '',
    avatarid = undefined,
    color = '#808080',
    body,
    isMine = false,
}) => {
    return (
        <Container isMine={isMine}>
            <Avatar name={name} avatarid={avatarid} color={color} />
            <BodyContainer isMine={isMine}>
                <Nameplate>{name}</Nameplate>
                <MessageBody>{body}</MessageBody>
            </BodyContainer>
        </Container>
    );
};

export const MessageContainer: React.FC<{ userid: UserID; body: string }> = ({
    userid,
    body,
}) => {
    const user = useRecoilValue(PlayerAtom(userid));
    const team = useRecoilValue(PlayerTeamSelector(userid));
    const { color } = useRecoilValue(TeamAtom(team || ''));
    const myid = useRecoilValue(MyIDAtom);
    return (
        <Message
            {...user}
            body={body}
            color={color}
            isMine={user.id === myid}
        />
    );
};

export default MessageContainer;
