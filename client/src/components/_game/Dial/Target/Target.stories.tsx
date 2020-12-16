import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Target, TargetProps } from './Target';

export default {
    title: 'Game Components/Dial/Target',
    component: Target,
    argTypes: {
        center: {
            control: {
                type: 'range',
                min: 0,
                max: 180,
                step: 1,
            },
        },
        width: {
            control: {
                type: 'range',
                min: 0,
                max: 10,
                step: 1,
            },
        },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    width: '100%',
                    height: '0',
                    paddingBottom: '50%',
                    position: 'relative',
                    // backgroundColor: 'green',
                }}
            >
                <Story />
            </div>
        ),
    ],
} as Meta;

export const Default: Story<TargetProps> = (args) => <Target {...args} />;
Default.args = {
    center: 45,
    width: 4,
};
