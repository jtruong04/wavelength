import React from 'react';
import './Target.css';
import '../Dial.css';
import { useRecoilValue } from 'recoil';
import { TargetAtom } from 'atoms/game';
import { OptionsAtom } from 'atoms/options';

export interface TargetProps {
    /**
     * Marks the bullseye
     */
    center: number;
    /**
     * The width of the bullseye in degrees
     */
    width: number;
}

export const Target: React.FC<TargetProps> = ({ center, width }) => {
    return (
        <div className='container-clip' id='target'>
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
            />
        </div>
    );
};

const TargetContainer = () => {
    const center = useRecoilValue(TargetAtom);
    const options = useRecoilValue(OptionsAtom);
    return <Target center={center} width={options.targetWidth} />;
};

export default TargetContainer;
