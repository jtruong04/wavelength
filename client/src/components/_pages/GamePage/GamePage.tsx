// Libraries
import React, { useEffect, useState } from 'react';
// Components
import ChatBox from 'components/_chat/ChatBox';
import Dial from 'components/_game/Dial';
import RoomIndicator from 'components/_ui/RoomIndicator';
// Hooks
// import useJoinRoom from 'hooks/depr_useJoinRoom';
// Styling
import './GamePage.css';
import Lobby from 'components/_game/Controls/Lobby';
import socket from 'services/socket';
import { SocketEvent } from 'enums';
import { useRecoilValue } from 'recoil';
import { RoomAtom } from 'atoms/room';
import { MyIDAtom } from 'atoms/user';

const GamePage = () => {
    // const room = useRecoilValue(RoomAtom);
    // const userid = useRecoilValue(MyIDAtom);
    // const [joined, setJoined] = useState(false);
    // useEffect(() => {
    //     // Join Room
    //     socket.emit(
    //         SocketEvent.JOIN_ROOM,
    //         {
    //             room,
    //             userid,
    //         },
    //         () => {
    //             setJoined(true);
    //         }
    //     );
    // }, [room, userid]);

    // if (!joined) {
    //     return <div>Loading</div>;
    // }

    return (
        <>
            <RoomIndicator />
            <div className='grid-container'>
                <div className='Chat'>
                    <ChatBox />
                </div>
                <div className='Score'></div>
                <div className='Dial'>
                    <Dial />
                </div>
                <div className='Control'>
                    <Lobby />
                </div>
            </div>
        </>
    );
};

export default GamePage;
