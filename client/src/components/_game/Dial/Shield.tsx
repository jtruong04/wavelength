import React from 'react';
// Styling
import './Dial.css';

export interface ShieldProps {
    open: boolean;
}

const Shield: React.FC<ShieldProps> = ({ open }) => {
    return (
        <div
            className={`dial shield ${open ? 'shield-open' : 'shield-closed'}`}
        ></div>
    );
};

export default Shield;
