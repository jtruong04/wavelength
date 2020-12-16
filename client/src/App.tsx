// Libraries
import React from 'react';
import { useRecoilValue } from 'recoil';
import ReactLoading from 'react-loading';
// Components
import { Background } from 'components/_ui/Background';
import { Homepage } from 'components/_pages/Homepage';
import { GamePage } from 'components/_pages/GamePage';
// Hooks
import useSocket from 'hooks/useSocket';
// Atoms
import { UserIDState } from 'atoms/user';
import { RoomState } from 'atoms/room';
// CSS
import 'App.css';

const App: React.FC = () => {
    const room = useRecoilValue(RoomState);
    const userid = useRecoilValue(UserIDState);

    useSocket();

    if (!userid) {
        return (
            <div className='App'>
                <Background />
                <div className='loading'>
                    <ReactLoading type='balls' />
                </div>
            </div>
        );
    }
    return (
        <div className='App'>
            <Background />
            {room ? <GamePage /> : <Homepage />}
        </div>
    );
};

export default App;
