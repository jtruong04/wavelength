import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Avatar, { AvatarProps } from './Avatar';
import { Point } from 'types';
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

const AvatarContainer: React.FC<AvatarProps> = ({ ...props }) => {
    const [position, setPosition] = useState<Point>({ x: 50, y: 50 });

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <Avatar
                {...props}
                position={position}
                draggable={{
                    setPosition,
                }}
            />
        </div>
    );
};

export const Draggable: Story<AvatarProps> = (args) => (
    <AvatarContainer {...args} />
);
Draggable.args = {
    ...Default.args,
};
