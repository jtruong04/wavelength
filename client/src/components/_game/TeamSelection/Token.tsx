// Libraries
import React, { RefObject } from 'react';
// Recoil
import { useRecoilValue } from 'recoil';
import { TokenStates, PlayerTeamStates, PlayerState } from 'atoms/user';
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
import Avatar from 'components/Avatar';
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
    // const [tokenPosition, setPosition] = useRecoilState(TokenStates(playerid));
    const setTeam = useSetSocketRecoilFamily(
        PlayerTeamStates,
        playerid,
        GameEvents.CHANGE_TEAM
    );
    // const setTeam = useSetRecoilState(PlayerTeamStates(playerid));
    const player = useRecoilValue(PlayerState(playerid));

    const handleDrag = useDrag(
        containerRef,
        (newValue) => setPosition(playerid, newValue),
        (releasePoint) => {
            const box = containerRef.current!.getBoundingClientRect();
            const newPosition = {
                x: clamp(
                    ((releasePoint.x - box.left) / box.width) * 100,
                    10,
                    90
                ),
                y: clamp(
                    ((releasePoint.y - box.top) / box.height) * 100,
                    10,
                    90
                ),
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
                onMouseDown={draggable ? handleDrag : undefined}
                onTouchStart={draggable ? handleDrag : undefined}
            >
                <Avatar {...player} tooltip large />
            </div>
            {/* <div className='token-label'>{playerid || ''}</div> */}
            {/* <div className='token-label'>{player.name || ''}</div> */}
        </div>
    );
};

export default Token;
