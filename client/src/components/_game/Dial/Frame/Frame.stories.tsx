import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Frame, { FrameProps } from './Frame';
// import { ScreenAtom } from 'atoms/game';
// import useRotate from 'hooks/useRotate';
// import { useRecoilState } from 'recoil';
// import { computeAngle } from 'utils/generic';
// import { Point } from 'types';

// const ScreenStoryContainer = () => {
//     const [angle, setAngle] = useRecoilState(ScreenAtom);
//     const onClick = () => setAngle((value) => (value > 90 ? 0 : 180));

//     const onRelease = (
//         releasePoint: Point,
//         _initialPoint: Point,
//         pivotPoint: Point
//     ) => {
//         const newAngle = computeAngle(pivotPoint, releasePoint) - 180;
//         if (newAngle > 90 || newAngle < -90) {
//             setAngle(180);
//         } else {
//             setAngle(0);
//         }
//     };
//     const handleDrag = useRotate(setAngle, onRelease, onClick);
//     return <Screen onDrag={handleDrag} angle={angle} />;
// };

export default {
    title: 'Game Components/Dial/Frame',
    component: Frame,
    argTypes: {},
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

export const Default: Story<FrameProps> = (args) => <Frame {...args} />;
Default.args = {
    angle: 0,
};
