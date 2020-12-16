import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MessageList, MessageListProps } from './MessageList';

import { messages } from 'assets/mock_data/mock_messages.json';

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
} as Meta;

const Template: Story<MessageListProps> = (args) => <MessageList {...args} />;

export const Default = Template.bind({});
Default.args = { messages };
