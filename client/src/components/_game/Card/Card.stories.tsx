import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Card, CardProps } from './Card';
// import { RecoilRoot } from 'recoil';

export default {
    title: 'Game Components/Card',
    component: Card,
    argTypes: {
        leftText: {
            table: {
                category: 'Text',
            },
        },
        rightText: {
            table: {
                category: 'Text',
            },
        },
        leftColor: {
            control: {
                type: 'color',
            },
            table: {
                category: 'Colors',
            },
        },
        rightColor: {
            control: {
                type: 'color',
            },
            table: {
                category: 'Colors',
            },
        },
    },
} as Meta;

export const Default: Story<CardProps> = (args) => <Card {...args} />;
Default.args = {
    leftText: 'Left',
    rightText: 'Right',
    leftColor: '#F6F1D6',
    rightColor: '#79BEB9',
};
