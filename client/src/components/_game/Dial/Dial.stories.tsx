import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Dial, { DialProps } from './Dial';

export default {
    title: 'Game Components/Dial',
    component: Dial,
    argTypes: {},
    decorators: [
        (Story) => (
            <div
                style={{
                    width: '100%',
                    height: '0',
                    paddingBottom: '50%',
                    position: 'relative',
                }}
            >
                <Story />
            </div>
        ),
    ],
} as Meta;

export const Combined: Story<DialProps> = (args) => <Dial {...args} />;
Combined.args = {};
