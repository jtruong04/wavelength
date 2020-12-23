// Libraries
import React from 'react';
import { useRecoilValue } from 'recoil';
// Components
import { Background } from 'components/_ui/Background';
import { Homepage } from 'components/_pages/Homepage';
import { GamePage } from 'components/_pages/GamePage';
import Loading from 'components/_common/Loading';
// Hooks
import useSocket from 'hooks/useSocket';
// Atoms
import { MyIDAtom } from 'atoms/user';
import { RoomAtom } from 'atoms/room';
// CSS
import 'App.css';

const App: React.FC = () => {
    const room = useRecoilValue(RoomAtom);
    const userid = useRecoilValue(MyIDAtom);

    useSocket();

    return (
        <div className='App'>
            <Background />
            {userid ? room ? <GamePage /> : <Homepage /> : <Loading />}
        </div>
    );
};

export default App;
