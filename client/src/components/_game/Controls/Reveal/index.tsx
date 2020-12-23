// import useStateMachine from 'hooks/useStateMachine';
import React from 'react';

const Reveal = () => {
    // const goToNextState = useStateMachine();
    const handleContinue = (e: React.MouseEvent) => {
        e.preventDefault();
        // goToNextState({ continue: true });
    };
    const handleGameOver = (e: React.MouseEvent) => {
        e.preventDefault();
        // goToNextState({ continue: false });
    };

    return (
        <div>
            <div>Reveal State</div>
            <button onClick={handleContinue}>Continue</button>
            <button onClick={handleGameOver}>End</button>
        </div>
    );
};

export default Reveal;
