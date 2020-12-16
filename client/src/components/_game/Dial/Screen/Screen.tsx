import React, { useRef, useState } from 'react';
// Styling
import './Screen.css';
import '../Dial.css';
import { useSocketRecoilState } from 'hooks/useSocketRecoilState';
import { GameEvents } from 'enums';
import { ScreenState } from 'atoms/ui';
import { Point } from 'types';
import { computeAngle } from 'utils/generic';
import useRotate from 'hooks/useRotate';

export interface ScreenProps {
    angle: number;
    onDrag: (
        event: React.MouseEvent | React.TouchEvent,
        pivotRef: React.RefObject<HTMLDivElement>
    ) => void;
}

export const Screen: React.FC<ScreenProps> = ({ angle, onDrag }) => {
    const screenRef = useRef<HTMLDivElement>(null);

    const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        setNoTransitions(true);
        const turnOnTransitions = (event: MouseEvent | TouchEvent) => {
            event.preventDefault();
            setNoTransitions(false);
            document.removeEventListener('mouseup', turnOnTransitions);
            document.removeEventListener('touchend', turnOnTransitions);
        };
        document.addEventListener('mouseup', turnOnTransitions);
        document.addEventListener('touchend', turnOnTransitions);

        onDrag(event, screenRef);
    };

    const [noTransitions, setNoTransitions] = useState(false);
    return (
        <>
            <div className='container-clip' id='screen-plate'>
                <div
                    className={`screen screen-plate ${
                        noTransitions ? 'notransition' : ''
                    }`}
                    style={{
                        transform: `rotate(${angle}deg)`,
                    }}
                />
            </div>
            <div
                id='screen-handle'
                className={`screen screen-handle ${
                    noTransitions ? 'notransition' : ''
                }`}
                style={{
                    transform: `translate(-50%, +50%) rotate(${
                        90 + angle
                    }deg) translate(0, 185%)`,
                }}
                onMouseDown={handleDrag}
                onTouchStart={handleDrag}
            />
            <div id='screen-pivot' ref={screenRef} />
        </>
    );
};

export const ScreenContainer = () => {
    const [angle, setAngle] = useSocketRecoilState(
        ScreenState,
        GameEvents.TOGGLE_SCREEN
    );
    const onClick = (
        releasePoint: Point,
        _initialPoint: Point,
        pivotPoint: Point
    ) => {
        const newAngle = computeAngle(releasePoint, pivotPoint);
        setAngle(newAngle < 90 || newAngle > 270 ? 180 : 0);
    };

    const onRelease = (
        releasePoint: Point,
        _initialPoint: Point,
        pivotPoint: Point
    ) => {
        const newAngle = computeAngle(pivotPoint, releasePoint) - 180;
        setAngle(newAngle > 90 || newAngle < -90 ? 180 : 0);
    };
    const handleDrag = useRotate(setAngle, onRelease, onClick);
    return <Screen onDrag={handleDrag} angle={angle} />;
};

export default ScreenContainer;
