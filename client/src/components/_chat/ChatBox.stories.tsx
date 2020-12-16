import React, { useEffect } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ChatBox, { ChatBoxProps } from './ChatBox';

// import { messages } from 'assets/mock_data/mock_messages.json';
import { useSetRecoilState } from 'recoil';
import { ChatState } from 'atoms/chat';
import { UserIDState } from 'atoms/user';
import { RoomState } from 'atoms/room';
import { messages } from 'assets/mock_data/mock_messages.json';

const MockDataInjector = () => {
    const setMessages = useSetRecoilState(ChatState);
    const setRoom = useSetRecoilState(RoomState);
    const setID = useSetRecoilState(UserIDState);

    useEffect(() => {
        setID('12345');
        setMessages(
            messages.map((msg) => ({
                id: msg.isMine ? '12345' : '54321',
                name: msg.name,
                avatar: msg.avatar,
                color: msg.color,
                body: msg.body,
            }))
        );
        setRoom('DUMMY');
    }, [setID, setRoom, setMessages]);

    return null;
};

export default {
    title: 'Chat Components/ChatBox',
    component: ChatBox,
    argTypes: {
        messages: {
            table: {
                disable: true,
            },
        },
    },
    decorators: [
        (Story) => (
            <>
                <MockDataInjector />
                <Story />
            </>
        ),
    ],
} as Meta;

const Template: Story<ChatBoxProps> = (args) => <ChatBox {...args} />;

export const Default = Template.bind({});
Default.args = { messages };
