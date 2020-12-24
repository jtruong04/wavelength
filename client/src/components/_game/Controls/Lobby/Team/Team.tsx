import {
    TeamNameSelector,
    TeamOrderingAtom,
    TeamWithRosterSelector,
} from 'atoms/team';
import color from 'color';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Player from '../Player';
import RemoveTeam from '../RemoveTeam';

const TeamContainer = styled.div`
    height: 100%;
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
`;

const DraggableContainer = styled.div`
    margin: 2%;
    /* width: 46%; */
    flex: 1 0 0;
    background-color: ${(props: { color?: string }) =>
        props.color || '#808080'};
    color: ${(props: { color?: string }) =>
        color(props.color).isDark() ? 'white' : 'black'};
`;
const Title = styled.input`
    width: 96%;
    border: none;
    text-align: center;
    background: #00000000;
    padding: 2%;
    letter-spacing: 0.00938em;
    line-height: 1.5;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    margin: 0;
    color: ${(props: { color?: string }) =>
        color(props.color).isDark() ? 'white' : 'black'};
`;
const List = styled.div`
    flex-grow: 1;
    min-height: 100px;
`;

export interface TeamProps {
    index: number;
    teamid: string;
}

const Team: React.FC<TeamProps> = ({ teamid, index }) => {
    const team = useRecoilValue(TeamWithRosterSelector(teamid));
    const teams = useRecoilValue(TeamOrderingAtom);
    const setTeamName = useSetRecoilState(TeamNameSelector(teamid));
    const renderUsers = () => {
        return team.roster.map((userid, index) => {
            return <Player key={userid} userid={userid} index={index} />;
        });
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeamName(event.target.value);
    };

    return (
        <Draggable draggableId={teamid} index={index}>
            {(provided) => (
                <DraggableContainer
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    color={team.color}
                >
                    <TeamContainer>
                        <Title
                            onChange={handleTitleChange}
                            name='teamName'
                            value={team.name}
                            color={team.color}
                        />
                        {teams.length > 1 && <RemoveTeam teamid={teamid} />}
                        <Droppable droppableId={teamid} type='user'>
                            {(provided) => (
                                <List
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {renderUsers()}
                                    {provided.placeholder}
                                </List>
                            )}
                        </Droppable>
                    </TeamContainer>
                </DraggableContainer>
            )}
        </Draggable>
    );
};

export default Team;
