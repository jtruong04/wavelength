import { HighLow } from 'enums';
import React from 'react';
import useStateMachine from 'hooks/useStateMachine';

const StandbyDeliberation = () => {
    const goToNextState = useStateMachine();
    const handleLow = (e: React.MouseEvent) => {
        e.preventDefault();
        goToNextState({ highlow: HighLow.LOW });
    };
    const handleHigh = (e: React.MouseEvent) => {
        e.preventDefault();
        goToNextState({ highlow: HighLow.HIGH });
    };
    return (
        <div>
            <button onClick={handleLow}>LOW</button>
            <button onClick={handleHigh}>HIGH</button>
        </div>
    );
};

export default StandbyDeliberation;
