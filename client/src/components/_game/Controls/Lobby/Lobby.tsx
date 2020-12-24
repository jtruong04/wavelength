import { TeamOrderingAtom } from 'atoms/team';
import { UserSelector } from 'atoms/user';
import Button from 'components/_common/Button';
import useStateMachine, { useLobbyHandler } from 'hooks/useStateMachine';
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
    const goToNextState = useStateMachine();

    const handleClick = () => {
        goToNextState();
    };

    const teams = useRecoilValue(TeamOrderingAtom);

    return (
        <>
            <TeamSelection />
            {host && (
                <Button onClick={handleClick}>
                    {teams.length > 1 ? 'Start' : 'Start Free Play'}
                </Button>
            )}
        </>
    );
};

export default Lobby;
