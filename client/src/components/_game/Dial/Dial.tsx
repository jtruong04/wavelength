// Libraries
import React from 'react';
// Recoil
import { useRecoilValue } from 'recoil';
import { TargetState } from 'atoms/ui';
import { GameOptions, IsShieldOpen } from 'atoms/stateMachine';
// Components
import Shield from './Shield';
import Target from './Target';
import Knob from './Knob';
import ShieldHandle from './ShieldHandle';
// Styling
import './Dial.css';

export interface DialProps {}

const Dial: React.FC<DialProps> = () => {
    const center = useRecoilValue(TargetState);
    const options = useRecoilValue(GameOptions);
    const open = useRecoilValue(IsShieldOpen);
    // const open = true;
    // const { shieldEnabled } = useRecoilValue(UIState);
    return (
        <div className='container'>
            <div className='container-noclip'>
                <Knob />
                <ShieldHandle />
                <div className='frame'></div>
            </div>
            <div className='container-clip'>
                <Target center={center} width={options.targetWidth} />
                <Shield open={open} />
            </div>
        </div>
    );
};

export default Dial;
