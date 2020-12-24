import { useForkHandler } from 'hooks/useStateMachine';
import React, { useEffect } from 'react';

const Fork = () => {
    const [onForkEnter, onForkExit] = useForkHandler();

    useEffect(() => {
        onForkEnter();
        return () => {
            onForkExit();
        };
    }, [onForkEnter, onForkExit]);

    return <div></div>;
};

export default Fork;
