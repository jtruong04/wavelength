// Libraries
import React from 'react';
// Components
import ChatBox from 'components/_chat/ChatBox';
// Hooks
import useJoinRoom from 'hooks/useJoinRoom';
// Styling
import './GamePage.css';
import TeamSelection from 'components/_game/Controls/TeamSelection/TeamSelection';
import Dial from 'components/_game/Dial';

const GamePage = () => {
    useJoinRoom();

    return (
        <div className='grid-container'>
            <div className='Chat'>
                <ChatBox />
            </div>
            <div className='Score'></div>
            <div className='Dial'>
                <Dial />
            </div>
            <div className='Control'>
                <TeamSelection />
            </div>
        </div>
    );
};

export default GamePage;
