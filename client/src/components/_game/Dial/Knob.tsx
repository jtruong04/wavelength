// Libraries
import React, { useRef } from 'react';
// Recoil
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { RoomState } from 'atoms/room';
import { DialState } from 'atoms/ui';
// Hooks
import { useSocketRecoilState } from 'hooks/useSocketRecoilState';
import useRotate from 'hooks/useRotate';
// Services
// import socket from 'services/socket';
// Utils
// import { getMousePosition } from 'utils/system';
// import { computeAngle } from 'utils/generic';
// Styling
import './Dial.css';
// Types
// import { Point } from 'types';
import { GameEvents, State } from 'enums';
import { useRecoilValue } from 'recoil';
import {
    ActiveTeamRoster,
    IsClueGiver,
    StateMachine,
} from 'atoms/stateMachine';
import { UserIDState } from 'atoms/user';

const Knob = () => {
    const [angle, setAngle] = useSocketRecoilState(
        DialState,
        GameEvents.TURN_DIAL
    );
    const knobRef = useRef<HTMLDivElement>(null);
    const startDrag = useRotate(knobRef, setAngle);

    const activeTeam = useRecoilValue(ActiveTeamRoster);
    const userid = useRecoilValue(UserIDState);
    const currentState = useRecoilValue(StateMachine);
    const isClueGiver = useRecoilValue(IsClueGiver);

    return (
        <>
            <div
                className='knob-hand-shadow'
                style={{
                    transform: `translate(-50%, 3px) rotate(${angle - 90}deg) `,
                }}
            ></div>
            <div
                className='knob-hand'
                style={{
                    transform: `translate(-50%, 0) rotate(${angle - 90}deg)`,
                }}
                onMouseDown={
                    activeTeam.includes(userid) &&
                    currentState === State.DELIBERATION_ACTIVE &&
                    !isClueGiver
                        ? startDrag
                        : undefined
                }
                onTouchStart={
                    activeTeam.includes(userid) &&
                    currentState === State.DELIBERATION_ACTIVE &&
                    !isClueGiver
                        ? startDrag
                        : undefined
                }
            ></div>
            <div
                className='knob-control'
                onMouseDown={
                    activeTeam.includes(userid) &&
                    currentState === State.DELIBERATION_ACTIVE &&
                    !isClueGiver
                        ? startDrag
                        : undefined
                }
                onTouchStart={
                    activeTeam.includes(userid) &&
                    currentState === State.DELIBERATION_ACTIVE &&
                    !isClueGiver
                        ? startDrag
                        : undefined
                }
                ref={knobRef}
            ></div>
        </>
    );
};

export default Knob;
