import {
    PlayerState,
    PlayerTeamStates,
    TeamState,
    TokenStates,
} from 'atoms/user';
import { GameEvents, TeamID } from 'enums';
import React, { RefObject } from 'react';
import { useRecoilValue } from 'recoil';
import { Point, UserID } from 'types';
import Avatar from 'components/_common/Avatar';
import {
    useSetSocketRecoilFamily,
    useSocketRecoilFamily,
} from 'hooks/useSocketRecoilState';

export interface TokenProps {
    id: UserID;
    draggable?: boolean;
    containerRef?: RefObject<HTMLElement>;
}

const Token: React.FC<TokenProps> = ({ id, draggable, containerRef }) => {
    const player = useRecoilValue(PlayerState(id));
    const team = useRecoilValue(TeamState(player.team || TeamID.NONE));
    const [position, setPosition] = useSocketRecoilFamily(
        TokenStates,
        player.id,
        GameEvents.DRAG_TOKEN
    );
    const setTeam = useSetSocketRecoilFamily(
        PlayerTeamStates,
        player.id,
        GameEvents.CHANGE_TEAM
    );

    const handleDrag = (releasePoint: Point, _initialPoint: Point): void => {
        const box = containerRef!.current!.getBoundingClientRect();
        const newPosition = {
            x: ((releasePoint.x - box.left) / box.width) * 100,
            y: ((releasePoint.y - box.top) / box.height) * 100,
        };
        const newTeam =
            newPosition.x < 40
                ? TeamID.A
                : newPosition.x > 60
                ? TeamID.B
                : TeamID.NONE;
        setTeam(player.id, newTeam);
    };
    return (
        <Avatar
            name={player.name}
            avatar={player.avatar}
            color={team.color}
            position={position}
            draggable={
                draggable
                    ? {
                          setPosition: (newState) =>
                              setPosition(player.id, newState),
                          onDragRelease: handleDrag,
                      }
                    : undefined
            }
            tooltip
            large
        />
    );
};

export default Token;
