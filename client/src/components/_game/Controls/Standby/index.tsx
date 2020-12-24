// import { HighLow } from 'enums';
import { useStandbyHandler } from 'hooks/useStateMachine';
import React, { useEffect } from 'react';
// import useStateMachine from 'hooks/useStateMachine';
import SpectrumCard from 'components/_game/SpectrumCard';

const Standby = () => {
    const [onStandbyEnter, onStandbyExit] = useStandbyHandler();

    useEffect(() => {
        onStandbyEnter();
        return () => {
            onStandbyExit();
        };
    }, [onStandbyEnter, onStandbyExit]);

    // const goToNextState = useStateMachine();
    const handleLow = (e: React.MouseEvent) => {
        e.preventDefault();
        // goToNextState({ highlow: HighLow.LOW });
    };
    const handleHigh = (e: React.MouseEvent) => {
        e.preventDefault();
        // goToNextState({ highlow: HighLow.HIGH });
    };
    return (
        <div>
            <SpectrumCard />

            <button onClick={handleLow}>LOW</button>
            <button onClick={handleHigh}>HIGH</button>
        </div>
    );
};

export default Standby;
