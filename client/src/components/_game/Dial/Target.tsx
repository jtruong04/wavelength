import React from 'react';
import './Dial.css';

export interface TargetProps {
    center: number;
    width: number;
}

const Target: React.FC<TargetProps> = ({ center, width }) => {
    return (
        <div
            className='dial'
            style={{
                overflow: 'hidden',
            }}
        >
            <div
                className='target'
                style={{
                    backgroundImage: `conic-gradient(from -90deg at 50% 50%,
                    rgb(240,236,226)	 0deg ${90 - width * 2.5}deg,
                    rgb(172,129,52) ${90 - width * 2.5}deg ${
                        90 - width * 1.5
                    }deg,
                    rgb(158,188,153) ${90 - width * 1.5}deg ${
                        90 - width * 0.5
                    }deg,
                    rgb(204,99,70) ${90 - width * 0.5}deg ${
                        90 + width * 0.5
                    }deg,
                    rgb(158,188,153) ${90 + width * 0.5}deg ${
                        90 + width * 1.5
                    }deg,
                    rgb(172,129,52) ${90 + width * 1.5}deg ${
                        90 + width * 2.5
                    }deg,
                    rgb(240,236,226) ${90 + width * 2.5}deg 360deg
                )`,
                    transform: `rotate(${center - 90}deg)`,
                }}
            ></div>
        </div>
    );
};

export default Target;
