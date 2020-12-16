import React from 'react';
import './Frame.css';
export interface FrameProps {}

const Frame: React.FC<FrameProps> = () => {
    return (
        <>
            <div className='container-noclip' id='frame'>
                <div className='frame' />
            </div>
        </>
    );
};

export default Frame;
