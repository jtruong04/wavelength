import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AddTeam, { AddTeamProps } from './AddTeam';

export default {
    title: 'Game Components/Control Area/Lobby/Add Team',
    component: AddTeam,
    argTypes: {},
} as Meta;

export const Default: Story<AddTeamProps> = (args) => <AddTeam {...args} />;
Default.args = {};
