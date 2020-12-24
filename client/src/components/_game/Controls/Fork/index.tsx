import { UserRoleSelector } from 'atoms/game';
import Button from 'components/_common/Button';
import { Role } from 'enums';
import useStateMachine, { useForkHandler } from 'hooks/useStateMachine';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const Fork = () => {
    const [onForkEnter, onForkExit] = useForkHandler();
    const goToNextState = useStateMachine();
    const userRole = useRecoilValue(UserRoleSelector);
    useEffect(() => {
        onForkEnter();
        return () => {
            onForkExit();
        };
    }, [onForkEnter, onForkExit]);

    const handleClick = () => {
        goToNextState();
    };

    if (userRole === Role.CLUE_GIVER) {
        return <Button onClick={handleClick}>Ready</Button>;
    }
    return null;
};

export default Fork;
