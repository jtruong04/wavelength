import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from './Button';
// import { RecoilRoot } from 'recoil';

export default {
    title: 'Common Components/Button',
    component: Button,
    argTypes: {},
} as Meta;

export const Default: Story<ButtonProps> = (args) => (
    <div style={{ position: 'relative', zIndex: 1 }}>
        <Button {...args}>
            <p>Button</p>
        </Button>
    </div>
);
Default.args = {};
