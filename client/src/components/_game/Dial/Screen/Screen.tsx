import React, { useRef, useState } from 'react';
// Styling
import './Screen.css';
import '../Dial.css';

import { Point } from 'types';
import { computeAngle } from 'utils/generic';
import useRotate from 'hooks/useRotate';
import { ReadyAtom, ScreenAtom, ScreenLockSelector } from 'atoms/game';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Screen as ScreenEnum } from 'enums';
import useStateMachine from 'hooks/useStateMachine';

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
                    transform: `translate(-50%, +50%) rotate(90deg) rotate(${angle}deg) translate(0, 185%)`,
                }}
                onMouseDown={handleDrag}
                onTouchStart={handleDrag}
            />
            <div id='screen-pivot' ref={screenRef} />
        </>
    );
};

export const ScreenContainer = () => {
    const [angle, setAngle] = useRecoilState(ScreenAtom);
    const lock = useRecoilValue(ScreenLockSelector);
    const ready = useRecoilValue(ReadyAtom);
    const goToNextState = useStateMachine();
    const onClick = (
        releasePoint: Point,
        _initialPoint: Point,
        pivotPoint: Point
    ) => {
        const newAngle = computeAngle(releasePoint, pivotPoint);
        setAngle(
            newAngle < 90 || newAngle > 270
                ? ScreenEnum.OPEN
                : ScreenEnum.CLOSED
        );
        if (ready && (newAngle < 90 || newAngle > 270)) {
            goToNextState();
        }
    };

    const onRelease = (
        releasePoint: Point,
        _initialPoint: Point,
        pivotPoint: Point
    ) => {
        const newAngle = computeAngle(pivotPoint, releasePoint) - 180;
        setAngle(
            newAngle > 90 || newAngle < -90
                ? ScreenEnum.OPEN
                : ScreenEnum.CLOSED
        );
        if (ready && (newAngle > 90 || newAngle < -90)) {
            goToNextState();
        }
    };

    const handleDrag = useRotate(setAngle, onRelease, onClick);

    return (
        <Screen
            onDrag={lock ? () => {} : handleDrag}
            angle={lock ? 0 : angle}
        />
    );
};

export default ScreenContainer;
