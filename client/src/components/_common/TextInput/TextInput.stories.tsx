import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TextInput, TextInputProps } from './TextInput';

export default {
    title: 'Common Components/TextInput',
    component: TextInput,
    argTypes: {
        onSubmit: {
            action: 'onSubmit',
        },
    },
} as Meta;

export const Default: Story<TextInputProps> = (args) => <TextInput {...args} />;
Default.args = {};
