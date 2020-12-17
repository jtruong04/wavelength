import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TeamSelection, { TeamSelectionProps } from './TeamSelection';

export default {
    title: 'Game Components/TeamSelection',
    component: TeamSelection,
    argTypes: {},
} as Meta;

export const Default: Story<TeamSelectionProps> = (args) => (
    <TeamSelection {...args} />
);
Default.args = {};
