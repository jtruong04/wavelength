import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Table, { TableProps } from './Table';

export default {
    title: 'Game Components/Control Panel/Team Selection/Table',
    component: Table,
    argTypes: {
        leftLabel: {
            table: {
                category: 'Text',
            },
        },
        rightLabel: {
            table: {
                category: 'Text',
            },
        },
        middleLabel: {
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
        middleColor: {
            control: {
                type: 'color',
            },
            table: {
                category: 'Colors',
            },
        },
    },
} as Meta;

export const Default: Story<TableProps> = (args) => <Table {...args} />;
Default.args = {
    leftLabel: 'Left Team',
    rightLabel: 'Right Team',
    leftColor: '#ED623B',
    rightColor: '#E9A802',
};
