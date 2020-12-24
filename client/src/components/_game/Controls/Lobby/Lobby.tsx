import { UserSelector } from 'atoms/user';
import Button from 'components/_common/Button';
import { useLobbyHandler } from 'hooks/useStateMachine';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import TeamSelection from './TeamSelection';

interface LobbyProps {}

const Lobby: React.FC<LobbyProps> = () => {
    const { host } = useRecoilValue(UserSelector);
    const [onLobbyEnter, onLobbyExit] = useLobbyHandler();

    useEffect(() => {
        onLobbyEnter();
        return () => {
            onLobbyExit();
        };
    }, [onLobbyEnter, onLobbyExit]);

    const handleClick = () => {
        // onLobbyExit();
    };

    return (
        <>
            {host && <Button onClick={handleClick}>Start</Button>}
            <TeamSelection />
        </>
    );
};

export default Lobby;
