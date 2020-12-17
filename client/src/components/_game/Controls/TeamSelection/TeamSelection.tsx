// Libraries
import React, { useRef } from 'react';
// Recoil
import { useRecoilValue } from 'recoil';
import { PlayerListState, TeamState, UserIDState } from 'atoms/user';
// Components
// import Token from './Token/Token';
// Styling
import './TeamSelection.css';
import { TeamID } from 'enums';
import Table from './Table/Table';
import Token from './Token';

export interface TeamSelectionProps {}

const TeamSelection: React.FC<TeamSelectionProps> = () => {
    const containerRef = useRef(null);
    const players = useRecoilValue(PlayerListState);
    const userid = useRecoilValue(UserIDState);

    const teamA = useRecoilValue(TeamState(TeamID.A));
    const teamB = useRecoilValue(TeamState(TeamID.B));

    const renderTokens = () =>
        players.map((player) => (
            <Token
                key={player}
                id={player}
                draggable={player === userid}
                containerRef={containerRef}
            />
        ));

    return (
        <div
            ref={containerRef}
            id='container'
            style={{
                position: 'relative',
                height: '100%',
                width: '100%',
            }}
        >
            <Table
                leftLabel={teamA.name}
                rightLabel={teamB.name}
                leftColor={teamA.color}
                rightColor={teamB.color}
            >
                {renderTokens()}
            </Table>
        </div>
    );
};

export default TeamSelection;
