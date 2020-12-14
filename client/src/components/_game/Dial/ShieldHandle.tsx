// Libraries
import React from 'react';
// Recoil
// import { IsSh } from 'atoms/ui';
// Hooks
// import { useSocketRecoilState } from 'hooks/useSocketRecoilState';
// Types
// import { GameEvents } from 'enums';
// Styling
import './Dial.css';
import { useRecoilValue } from 'recoil';
import { IsClueGiver, IsShieldOpen, StateMachine } from 'atoms/stateMachine';
import useStateMachine from 'hooks/useStateMachine';
import { HostState } from 'atoms/user';
import { State } from 'enums';
// Services
// import socket from 'services/socket';

export interface ShieldHandleProps {
    // open: boolean;
    // disabled: boolean;
}

const ShieldHandle: React.FC<ShieldHandleProps> = () => {
    // const [open, setOpen] = useSocketRecoilState(
    //     ShieldState,
    //     GameEvents.TOGGLE_SHIELD
    // );
    // const setTarget = useResetRecoilState(TargetState);
    // const closeAndSpin = useCloseAndSpinTarget();
    const goToNextState = useStateMachine();

    const open = useRecoilValue(IsShieldOpen);

    // const isClueGiver = useRecoilValue(IsClueGiver);
    const currentState = useRecoilValue(StateMachine);
    const isHost = useRecoilValue(HostState);

    const handleClick = () => {
        if (
            currentState === State.LOBBY &&
            isHost
            // (currentState === State.DELIBERATION_STANDBY && isClueGiver)
        ) {
            goToNextState();
        }
    };

    return (
        <div
            className={`shield shield-handle ${
                open ? 'shield-handle-open' : 'shield-handle-closed'
            }`}
            onClick={handleClick}
        ></div>
    );
};

export default ShieldHandle;
