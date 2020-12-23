import React from 'react';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import styled from 'styled-components';
import { useRecoilCallback } from 'recoil';
import { TeamOrderingAtom } from 'atoms/team';
import { TeamID } from 'types';

export interface RemoveTeamProps {
    teamid: TeamID;
}

const Button = styled.button`
    padding: 0;
    margin: 2%;
    border: 0;
    position: absolute;
    bottom: 0;
    right: 0;
    flex: 0 0 auto;
    background-color: #00000000;
    color: #00000040;

    &:focus {
        color: #000000ff;
        outline: none;
    }

    &:hover {
        color: #000000ff;
        outline: none;
    }
`;

const RemoveTeam: React.FC<RemoveTeamProps> = ({ teamid }) => {
    const removeTeam = useRecoilCallback(
        ({ set, snapshot }) => async (teamid: TeamID) => {
            let teams = await snapshot.getPromise(TeamOrderingAtom);
            if (teams.length > 1) {
                teams = teams.filter((team) => team !== teamid);
                set(TeamOrderingAtom, teams);
            }
        },
        []
    );

    const handleClick = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        removeTeam(teamid);
    };

    return (
        <Button onClick={handleClick}>
            <RemoveCircleIcon />
        </Button>
    );
};

export default RemoveTeam;
