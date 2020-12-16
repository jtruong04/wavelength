// Libraries
import React from 'react';
// Components
import Screen from './Screen';
import Target from './Target';
import Knob from './Knob';
import Frame from './Frame';

export interface DialProps {}

const Dial: React.FC<DialProps> = () => {
    return (
        <>
            <Target />
            <Frame />
            <Knob />
            <Screen />
        </>
    );
};

export default Dial;
