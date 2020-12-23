import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import RemoveTeam, { RemoveTeamProps } from './RemoveTeam';

export default {
    title: 'Game Components/Control Area/Lobby/Remove Team',
    component: RemoveTeam,
    argTypes: {},
} as Meta;

export const Default: Story<RemoveTeamProps> = (args) => (
    <RemoveTeam {...args} />
);
Default.args = {};
