import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Knob, KnobProps } from './Knob';
import { useRecoilState } from 'recoil';
import { DialState } from 'atoms/ui';
import useRotate from 'hooks/useRotate';

const KnobStoryContainer = () => {
    const [angle, setAngle] = useRecoilState(DialState);
    const handleDrag = useRotate(setAngle);
    return <Knob onDrag={handleDrag} angle={angle} />;
};

export default {
    title: 'Game Components/Dial/Knob',
    component: KnobStoryContainer,
    argTypes: {
        angle: {
            control: {
                type: 'range',
                min: 0,
                max: 180,
                step: 1,
            },
        },
        onDrag: { action: 'dragged' },
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

export const Default: Story<KnobProps> = (args) => <Knob {...args} />;
Default.args = {
    angle: 90,
};

export const Interactive: Story = (args) => <KnobStoryContainer {...args} />;
Interactive.args = {};
