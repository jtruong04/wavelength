import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Background, { BackgroundProps } from './Background';
// import { RecoilRoot } from 'recoil';

export default {
    title: 'Interface Components/Background',
    component: Background,
    argTypes: {
        onSubmit: {
            action: 'onSubmit',
        },
    },
} as Meta;

export const Default: Story<BackgroundProps> = (args) => (
    <Background {...args} />
);
Default.args = {};
