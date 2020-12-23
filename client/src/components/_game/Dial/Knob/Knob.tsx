// Libraries
import React, { useRef } from 'react';
// Hooks
import useRotate from 'hooks/useRotate';
// Styling
import '../Dial.css';
import './Knob.css';
import { DialAtom } from 'atoms/game';
import { useRecoilState } from 'recoil';

export interface KnobProps {
    /**
     * Callback to handle drag event.
     * pivotRef is the HTML element that serves as the axis of rotation
     */
    onDrag: (
        event: React.MouseEvent | React.TouchEvent,
        pivotRef: React.RefObject<HTMLDivElement>
    ) => void;
    /**
     * Angle the knob points
     */
    angle: number;
}

export const Knob: React.FC<KnobProps> = ({ onDrag, angle }) => {
    const knobRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div
                id='knob-hand-shadow'
                className='knob knob-hand knob-hand-shadow'
                style={{
                    transform: `translate(-50%, -98%) rotate(${
                        angle - 90
                    }deg) `,
                }}
            ></div>
            <div
                id='knob-hand'
                className='knob knob-hand'
                style={{
                    transform: `translate(-50%, -100%) rotate(${
                        angle - 90
                    }deg)`,
                }}
                onMouseDown={(e) => onDrag(e, knobRef)}
                onTouchStart={(e) => onDrag(e, knobRef)}
            ></div>
            <div
                id='knob-handle'
                className='knob knob-control'
                onMouseDown={(e) => onDrag(e, knobRef)}
                onTouchStart={(e) => onDrag(e, knobRef)}
                ref={knobRef}
            ></div>
        </>
    );
};

export const KnobContainer = () => {
    const [angle, setAngle] = useRecoilState(DialAtom);
    const handleDrag = useRotate(setAngle);
    return <Knob onDrag={handleDrag} angle={angle} />;
};

export default KnobContainer;
