import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Avatar, { AvatarProps } from './Avatar';
// import { RecoilRoot } from 'recoil';

export default {
    title: 'Common Components/Avatar',
    component: Avatar,
    argTypes: {
        color: {
            control: 'color',
        },
        avatar: {
            control: { type: 'range', min: 0, max: 30, step: 1 },
        },
    },
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'Name',
    color: '#808080',
    tooltip: false,
    large: false,
};

export const Small = Template.bind({});
Small.args = {
    ...Default.args,
    large: true,
};

export const Tooltip = Template.bind({});
Tooltip.args = {
    ...Default.args,
    tooltip: true,
};
