// Libraries
import React from 'react';
// Components
import ChatBox from 'components/_chat/ChatBox';
import Dial from 'components/_game/Dial';
import RoomIndicator from 'components/_ui/RoomIndicator';
import Lobby from 'components/_game/Controls/Lobby';
import Clue from 'components/_game/Controls/Clue';
// import ChangeState from 'components/_debug/ChangeState';
// Styling
import './GamePage.css';
import { StateAtom } from 'atoms/game';
import { StateMachine } from 'enums';
import Fork from 'components/_game/Controls/Fork';
import Active from 'components/_game/Controls/Active';
import Standby from 'components/_game/Controls/Standby';
import Reveal from 'components/_game/Controls/Reveal';
import { useRecoilValue } from 'recoil';
import SpectrumCard from 'components/_game/SpectrumCard';

const GamePage = () => {
    const gameState = useRecoilValue(StateAtom);

    const renderState = (gameState: StateMachine) => {
        switch (gameState) {
            case StateMachine.LOBBY:
                return <Lobby />;
            case StateMachine.FORK:
                return <Fork />;
            case StateMachine.CLUE:
                return <Clue />;
            case StateMachine.ACTIVE:
                return <Active />;
            case StateMachine.STANDBY:
                return <Standby />;
            case StateMachine.REVEAL:
                return <Reveal />;
            default:
                return null;
        }
    };

    const renderCard = (gameState: StateMachine) => {
        switch (gameState) {
            case StateMachine.LOBBY:
                return null;
            case StateMachine.FORK:
                return null;
            case StateMachine.CLUE:
                return <SpectrumCard />;
            case StateMachine.ACTIVE:
                return <SpectrumCard />;
            case StateMachine.STANDBY:
                return <SpectrumCard />;
            case StateMachine.REVEAL:
                return <SpectrumCard />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className='grid-container'>
                <div className='Chat'>
                    <div className='Chat-container'>
                        <ChatBox />
                    </div>
                </div>
                <div className='Score'>
                    <div className='Score-container'></div>
                </div>
                <div className='Card'>
                    <div className='Card-container'>
                        {renderCard(gameState)}
                    </div>
                </div>
                <div className='Dial'>
                    <div className='Dial-container'>
                        <Dial />
                    </div>
                </div>
                <div className='Control'>
                    <div className='Control-container'>
                        {renderState(gameState)}
                    </div>
                </div>
            </div>
            <RoomIndicator />
        </>
    );
};

export default GamePage;
