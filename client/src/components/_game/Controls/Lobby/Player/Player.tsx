import React from 'react';
import styled from 'styled-components';
import Typography from 'components/_common/Typography';
import Avatar from 'components/_common/Avatar';
import { MyIDAtom, PlayerAtom } from 'atoms/user';
import { useRecoilValue } from 'recoil';
import { UserID } from 'types';
import { Draggable } from 'react-beautiful-dnd';

const DraggableContainer = styled.div``;

const Cell = styled.div`
    display: flex;
    padding: 2%;
`;
const NamePlate = styled(Typography)`
    margin-left: 2%;
    display: flex;
    align-items: center;
    font-size: 1rem;
`;

export interface PlayerProps {
    /**
     * Index used for drag and drop
     */
    index: number;
    /**
     * User ID
     */
    userid: string;
    /**
     * User's name
     */
    name: string;
    /**
     * Index for their selected avatar
     */
    avatarid?: number;
}

export const Player: React.FC<PlayerProps> = ({
    index,
    userid,
    name,
    avatarid = 99,
}) => {
    const myid = useRecoilValue(MyIDAtom);
    return (
        <Draggable
            draggableId={userid}
            index={index}
            isDragDisabled={myid !== userid}
        >
            {(provided) => (
                <DraggableContainer
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Cell>
                        <Avatar
                            name={name}
                            avatarid={avatarid}
                            color='#808080'
                        />
                        <NamePlate>{name}</NamePlate>
                    </Cell>
                </DraggableContainer>
            )}
        </Draggable>
    );
};

export interface PlayerContainerProps {
    userid: UserID;
    index: number;
}
const PlayerContainer: React.FC<PlayerContainerProps> = ({ userid, index }) => {
    const user = useRecoilValue(PlayerAtom(userid));
    return <Player {...user} userid={userid} index={index} />;
};

export default PlayerContainer;
