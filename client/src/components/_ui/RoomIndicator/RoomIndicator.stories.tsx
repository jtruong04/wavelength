import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { RoomIndicator, RoomIndicatorProps } from './RoomIndicator';
// import { RecoilRoot } from 'recoil';

export default {
    title: 'Interface Components/RoomIndicator',
    component: RoomIndicator,
    argTypes: {},
} as Meta;

export const Default: Story<RoomIndicatorProps> = (args) => (
    <RoomIndicator {...args} />
);
Default.args = {
    room: 'ROOMID',
};
