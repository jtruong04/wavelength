import { RoomAtom } from 'atoms/room';
import React from 'react';
import { useRecoilValue } from 'recoil';
import './RoomIndicator.css';
export interface RoomIndicatorProps {
    room?: string;
}

export const RoomIndicator: React.FC<RoomIndicatorProps> = ({ room = '' }) => {
    return <div className='indicator'>{room}</div>;
};

const RoomIndicatorContainer = () => {
    const room = useRecoilValue(RoomAtom);
    return <RoomIndicator room={room} />;
};

export default RoomIndicatorContainer;
