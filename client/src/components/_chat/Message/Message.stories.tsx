import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Message, { MessageProps } from './Message';
// import { RecoilRoot } from 'recoil';

export default {
    title: 'Common Components/Message',
    component: Message,
    argTypes: {

    },
} as Meta;

const Template: Story<MessageProps> = (args) => <Message {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'Name',
    body: 'Hello',
    isMine: false
};