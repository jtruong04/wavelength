// import useStateMachine from 'hooks/useStateMachine';
import { useRevealHandler } from 'hooks/useStateMachine';
import React, { useEffect } from 'react';
import SpectrumCard from 'components/_game/SpectrumCard';

const Reveal = () => {
    const [onRevealEnter, onRevealExit] = useRevealHandler();
    useEffect(() => {
        onRevealEnter();
        return () => {
            onRevealExit(true);
        };
    }, [onRevealEnter, onRevealExit]);
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
            <SpectrumCard />
            <button onClick={handleContinue}>Continue</button>
            <button onClick={handleGameOver}>End</button>
        </div>
    );
};

export default Reveal;
