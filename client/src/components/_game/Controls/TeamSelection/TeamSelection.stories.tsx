import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TeamSelection, { TeamSelectionProps } from './TeamSelection';

export default {
    title: 'Game Components/Control Panel/Team Selection',
    component: TeamSelection,
    argTypes: {},
} as Meta;

export const Default: Story<TeamSelectionProps> = (args) => (
    <TeamSelection {...args} />
);
Default.args = {};
