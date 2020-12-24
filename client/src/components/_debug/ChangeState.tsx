import { StateAtom } from 'atoms/game';
import { StateMachine } from 'enums';
import useStateMachine from 'hooks/useStateMachine';
import React from 'react';
import { useRecoilState } from 'recoil';

const ChangeState = () => {
    const [state, setState] = useRecoilState(StateAtom);
    const goToNextState = useStateMachine();
    const handleClick = (state: StateMachine) => {
        setState(state);
    };

    const handleNext = () => {
        goToNextState({ continue: true });
    };

    return (
        <div>
            <p>{state}</p>
            <button onClick={() => handleClick(StateMachine.LOBBY)}>
                Team Select
            </button>
            <button onClick={() => handleClick(StateMachine.CLUE)}>Clue</button>
            <button onClick={() => handleClick(StateMachine.ACTIVE)}>
                Active
            </button>
            <button onClick={() => handleClick(StateMachine.STANDBY)}>
                Standby
            </button>
            <button onClick={() => handleClick(StateMachine.REVEAL)}>
                Reveal
            </button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default ChangeState;
