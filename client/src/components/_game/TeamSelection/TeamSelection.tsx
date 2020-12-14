// Libraries
import React, { useRef } from 'react';
// Recoil
import { useRecoilValue } from 'recoil';
import { PlayerListState, TeamState, UserIDState } from 'atoms/user';
// Components
import Token from './Token';
// Styling
import './TeamSelection.css';
import { TeamID } from 'enums';

export interface TeamSelectionProps {}

const TeamSelection: React.FC<TeamSelectionProps> = () => {
    const players = useRecoilValue(PlayerListState);
    const userid = useRecoilValue(UserIDState);
    const boxRef = useRef<HTMLDivElement>(null);

    const teamA = useRecoilValue(TeamState(TeamID.A));
    const teamB = useRecoilValue(TeamState(TeamID.B));

    // React.useEffect(() => {
    //     console.log(players);
    // }, [players]);

    const renderTokens = () =>
        players.map((player) => {
            return (
                <Token
                    key={player}
                    playerid={player}
                    containerRef={boxRef}
                    draggable={player === userid}
                />
            );
        });

    return (
        <>
            <h2 className='text'>Close the handle to start.</h2>
            <div ref={boxRef} className='selection-area'>
                <div
                    className='selection-team'
                    style={{
                        backgroundColor: teamA.color || '#ED623B',
                    }}
                >
                    Team {teamA.name}
                </div>
                <div className='selection-no-team'></div>
                <div
                    className='selection-team'
                    style={{
                        backgroundColor: teamB.color || '#E9A802',
                    }}
                >
                    Team {teamB.name}
                </div>
                {renderTokens()}
            </div>
        </>
    );
};

export default TeamSelection;
