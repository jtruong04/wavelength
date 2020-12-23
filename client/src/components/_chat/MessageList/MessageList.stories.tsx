import React, { useEffect } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MessageList, MessageListProps } from './MessageList';

import messageData from 'assets/mock_data/mock_messages';
import userData from 'assets/mock_data/mock_users';
import { TeamAtom, RosterAtom, TeamOrderingAtom } from 'atoms/team';
import { MyIDAtom, PlayerAtom, PlayerListAtom } from 'atoms/user';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { IUser, UserID, ITeam } from 'types';

const MockDataInjector = () => {
    const setID = useSetRecoilState(MyIDAtom);

    useEffect(() => {
        setID('user_A');
    }, [setID]);

    const setUser = useRecoilCallback(({ set }) => (user: IUser) => {
        set(PlayerAtom(user.id as UserID), user as IUser);
    });
    const setPlayerList = useSetRecoilState(PlayerListAtom);
    const setTeam = useRecoilCallback(
        ({ set }) => (team: ITeam & { roster: UserID[] }) => {
            set(TeamAtom(team.id), team);
            set(RosterAtom(team.id), team.roster);
        }
    );
    const setTeamOrder = useSetRecoilState(TeamOrderingAtom);

    useEffect(() => {
        userData.playerList.forEach((player) =>
            setUser(userData.players[player])
        );
        userData.teamOrder.forEach((team) => setTeam(userData.teams[team]));
        setPlayerList(userData.playerList);
        setTeamOrder(userData.teamOrder);
    }, [setUser, setPlayerList, setTeam, setTeamOrder]);
    return null;
};

export default {
    title: 'Chat Components/MessageList',
    component: MessageList,
    argTypes: {
        messages: {
            table: {
                disable: true,
            },
        },
    },
    decorators: [
        (Story) => (
            <>
                <MockDataInjector />
                <Story />
            </>
        ),
    ],
} as Meta;

const Template: Story<MessageListProps> = (args) => <MessageList {...args} />;

export const Default = Template.bind({});
Default.args = { messages: messageData.messages };

export const Empty = Template.bind({});
Empty.args = { messages: [] };
