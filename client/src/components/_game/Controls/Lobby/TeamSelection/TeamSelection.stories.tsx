import React, { useEffect } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TeamSelection, { TeamSelectionProps } from './TeamSelection';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import data from 'assets/mock_data/mock_users';
import { TeamAtom, RosterAtom, TeamOrderingAtom } from 'atoms/team';
import { PlayerAtom, PlayerListAtom } from 'atoms/user';
import { ITeam, IUser, UserID } from 'types';

export default {
    title: 'Game Components/Control Area/Lobby/Team Selection',
    component: TeamSelection,
    argTypes: {},
    decorators: [
        (Story) => (
            <>
                <MockDataInjector />
                <Story />
            </>
        ),
    ],
} as Meta;

const MockDataInjector = () => {
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
        data.playerList.forEach((player) => setUser(data.players[player]));
        data.teamOrder.forEach((team) => setTeam(data.teams[team]));
        setPlayerList(data.playerList);
        setTeamOrder(data.teamOrder);
    }, [setUser, setPlayerList, setTeam, setTeamOrder]);

    return null;
};

const Template: Story<TeamSelectionProps> = (args) => (
    <TeamSelection {...args} />
);

export const Default = Template.bind({});
Default.args = {};
