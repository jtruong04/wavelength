import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import styled from 'styled-components';
import { useRecoilCallback } from 'recoil';
import { TeamAtom, TeamOrderingAtom } from 'atoms/team';
import { v4 as uuidv4 } from 'uuid';

export interface AddTeamProps {}

export const Button = styled.button`
    padding: 0;
    margin: 2%;
    border: 0;
    position: absolute;
    top: 0;
    right: 0;
    flex: 0 0 auto;
    color: #00000040;
    background-color: #00000000;

    &:focus {
        color: #000000ff;
        outline: none;
    }

    &:hover {
        color: #000000ff;
        outline: none;
    }
`;

const AddTeam: React.FC<AddTeamProps> = (props) => {
    const createTeam = useRecoilCallback(
        ({ set, snapshot }) => async () => {
            const teamOrdering = await snapshot.getPromise(TeamOrderingAtom);
            if (teamOrdering.length < 3) {
                const newTeamName = `team_${uuidv4()}`;
                set(TeamOrderingAtom, (currentValue) => [
                    ...currentValue,
                    newTeamName,
                ]);
                set(TeamAtom(newTeamName), (currentValue) => ({
                    ...currentValue,
                }));
            }
        },
        []
    );

    const handleClick = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        createTeam();
    };

    return (
        <Button onClick={handleClick}>
            <AddCircleIcon />
        </Button>
    );
};

export default AddTeam;
