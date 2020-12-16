// Libraries
import React, { RefObject } from 'react';
// Recoil
import { useRecoilValue } from 'recoil';
import {
    TokenStates,
    PlayerTeamStates,
    PlayerState,
    MyTeamState,
} from 'atoms/user';
// Hooks
import useDrag from 'hooks/useDrag';
import {
    useSocketRecoilFamily,
    useSetSocketRecoilFamily,
} from 'hooks/useSocketRecoilState';
// Types
import { GameEvents, TeamID } from 'enums';
import { UserID } from 'types';
// Styling
import './TeamSelection.css';
// Components
import Avatar from 'components/_common/Avatar';
// Utils
import { clamp } from 'utils/generic';

export interface TokenProps {
    playerid: UserID;
    containerRef: RefObject<HTMLDivElement>;
    draggable?: boolean;
}

const Token: React.FC<TokenProps> = ({ playerid, containerRef, draggable }) => {
    const [tokenPosition, setPosition] = useSocketRecoilFamily(
        TokenStates,
        playerid,
        GameEvents.DRAG_TOKEN
    );
    const setTeam = useSetSocketRecoilFamily(
        PlayerTeamStates,
        playerid,
        GameEvents.CHANGE_TEAM
    );
    const player = useRecoilValue(PlayerState(playerid));
    const myTeam = useRecoilValue(MyTeamState);

    const handleDrag = useDrag(
        (newValue) => setPosition(playerid, newValue),
        (releasePoint) => {
            const box = containerRef.current!.getBoundingClientRect();
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
            setTeam(playerid, newTeam);
        }
    );

    return (
        <div
            className='selection-token'
            style={{
                left: `${tokenPosition.x || 50}%`,
                top: `${tokenPosition.y || 50}%`,
                zIndex: draggable ? 100 : 5,
            }}
        >
            <div
                onMouseDown={
                    draggable ? (e) => handleDrag(e, containerRef) : undefined
                }
                onTouchStart={
                    draggable ? (e) => handleDrag(e, containerRef) : undefined
                }
            >
                <Avatar
                    {...player}
                    color={myTeam.color || 'gray'}
                    tooltip
                    large
                />
            </div>
        </div>
    );
};

export default Token;
