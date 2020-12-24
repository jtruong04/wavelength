import { RosterAtom, TeamAtom, TeamOrderingAtom } from 'atoms/team';
import { IsCurrentOnTeamSelector, MyIDAtom, UserSelector } from 'atoms/user';
import React, { useEffect } from 'react';
import {
    DragDropContext,
    DraggableLocation,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import AddTeam from '../AddTeam';
import Team from '../Team';
import { v4 as uuidv4 } from 'uuid';

const TeamSelectionContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
`;

export interface TeamSelectionProps {}

const TeamSelection = () => {
    const teamOrdering = useRecoilValue(TeamOrderingAtom);
    const { host } = useRecoilValue(UserSelector);
    // Create team if none
    const createTeam = useRecoilCallback(
        ({ set }) => () => {
            const newTeam = `team_${uuidv4()}`;
            set(TeamOrderingAtom, (current) => [...current, newTeam]);
            set(TeamAtom(newTeam), (current) => ({ ...current }));
        },
        []
    );
    useEffect(() => {
        if (teamOrdering.length === 0 && host) {
            createTeam();
        }
    }, [teamOrdering, createTeam, host]);
    // Join First Team if not on one
    const isOnTeam = useRecoilValue(IsCurrentOnTeamSelector);
    const joinLobby = useRecoilCallback(
        ({ set, snapshot }) => async () => {
            const teamOrdering = await snapshot.getPromise(TeamOrderingAtom);
            const myid = await snapshot.getPromise(MyIDAtom);
            set(RosterAtom(teamOrdering[0]), (currVal) => {
                if (currVal.includes(myid)) {
                    return currVal;
                }
                return [...currVal, myid];
            });
        },
        []
    );
    useEffect(() => {
        if (!isOnTeam && teamOrdering.length > 0) {
            joinLobby();
        }
    });

    const changeColumnOrder = useRecoilCallback(
        ({ set, snapshot }) => async (
            destination: DraggableLocation,
            source: DraggableLocation,
            draggableId: string
        ) => {
            const oldOrder = await snapshot.getPromise(TeamOrderingAtom);
            const newOrder = Array.from(oldOrder);
            newOrder.splice(source.index, 1);
            newOrder.splice(destination.index, 0, draggableId);
            set(TeamOrderingAtom, newOrder);
        },
        []
    );

    const changeTeam = useRecoilCallback(
        ({ set, snapshot }) => async (
            destination: DraggableLocation,
            source: DraggableLocation,
            draggableId: string
        ) => {
            const oldTeam = await snapshot.getPromise(
                RosterAtom(source.droppableId)
            );
            const newTeam = await snapshot.getPromise(
                RosterAtom(destination.droppableId)
            );

            // If team does not change
            if (oldTeam === newTeam) {
                const newRosterOrder = Array.from(oldTeam);
                newRosterOrder.splice(source.index, 1);
                newRosterOrder.splice(destination.index, 0, draggableId);
                set(RosterAtom(destination.droppableId), newRosterOrder);
            } else {
                const newRosterOrderOldTeam = Array.from(oldTeam);
                newRosterOrderOldTeam.splice(source.index, 1);
                set(RosterAtom(source.droppableId), newRosterOrderOldTeam);
                const newRosterOrderNewTeam = Array.from(newTeam);
                newRosterOrderNewTeam.splice(destination.index, 0, draggableId);
                set(RosterAtom(destination.droppableId), newRosterOrderNewTeam);
            }
        },
        []
    );

    const renderTeams = () =>
        teamOrdering.map((teamid, index) => (
            <Team key={teamid} teamid={teamid} index={index} />
        ));

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId, type } = result;
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        if (type === 'column') {
            changeColumnOrder(destination, source, draggableId);
        } else if (type === 'user') {
            changeTeam(destination, source, draggableId);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
                droppableId='teams-list'
                direction='horizontal'
                type='column'
            >
                {(provided) => (
                    <TeamSelectionContainer
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {renderTeams()}
                        {provided.placeholder}
                        {teamOrdering.length < 3 && <AddTeam />}
                    </TeamSelectionContainer>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default TeamSelection;
