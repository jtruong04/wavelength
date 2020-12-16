import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Message, { MessageProps } from './Message';

export default {
    title: 'Chat Components/Message',
    component: Message,
    argTypes: {
        color: {
            control: 'color',
        },
        avatar: {
            control: { type: 'range', min: 0, max: 30, step: 1 },
        },
    },
} as Meta;

const Template: Story<MessageProps> = (args) => <Message {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'Name',
    body: 'Hello',
    isMine: false,
};
