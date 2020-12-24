// import useStateMachine from 'hooks/useStateMachine';
import Button from 'components/_common/Button';
import useStateMachine, { useRevealHandler } from 'hooks/useStateMachine';
import React, { useEffect } from 'react';

const Reveal = () => {
    const [onRevealEnter, onRevealExit] = useRevealHandler();
    useEffect(() => {
        onRevealEnter();
        return () => {
            onRevealExit();
        };
    }, [onRevealEnter, onRevealExit]);
    const goToNextState = useStateMachine();
    const handleContinue = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        goToNextState({ continue: true });
    };
    const handleGameOver = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        goToNextState({ continue: false });
    };

    return (
        <div>
            <Button onClick={handleContinue}>Continue</Button>
            <Button onClick={handleGameOver}>End</Button>
        </div>
    );
};

export default Reveal;
