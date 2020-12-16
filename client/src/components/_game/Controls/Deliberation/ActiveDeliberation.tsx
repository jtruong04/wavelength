import React from 'react';
import useStateMachine from 'hooks/useStateMachine';

const ActiveDeliberation = () => {
    const goToNextState = useStateMachine();
    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        goToNextState();
    };

    return (
        <div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default ActiveDeliberation;
