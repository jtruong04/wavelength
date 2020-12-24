// Library
import React from 'react';
// Styling
import './Background.css';

export interface BackgroundProps {}

const Background: React.FC = () => {
    return (
        <div className="body">
            <div id="bg-level9" className="pulsar"></div>
            <div id="bg-level8" className="pulsar"></div>
            <div id="bg-level7" className="pulsar"></div>
            <div id="bg-level6" className="pulsar"></div>
            <div id="bg-level5" className="pulsar"></div>
            <div id="bg-level4" className="pulsar"></div>
            <div id="bg-level3" className="pulsar"></div>
            <div id="bg-level2" className="pulsar"></div>
            <div id="bg-level1" className="pulsar"></div>
            <div id="bg-whiteOverlay"></div>
        </div>
    );
};

export default Background;
