import { useActiveHandler } from 'hooks/useStateMachine';
import React, { useEffect } from 'react';
// import useStateMachine from 'hooks/useStateMachine';
import SpectrumCard from 'components/_game/SpectrumCard';

const Active = () => {
    // const goToNextState = useStateMachine();
    const [onActiveEnter, onActiveExit] = useActiveHandler();

    useEffect(() => {
        onActiveEnter();
        return () => {
            onActiveExit();
        };
    }, [onActiveEnter, onActiveExit]);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        // goToNextState();
    };

    return (
        <div>
            <SpectrumCard />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Active;
