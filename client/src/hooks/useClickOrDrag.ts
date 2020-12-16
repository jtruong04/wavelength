import { useState } from 'react';
import { Point } from 'types';
import { computeDistance } from 'utils/generic';
import { getMousePosition } from 'utils/system';

const useClickOrDrag = (
    onDrag: (event: React.MouseEvent | React.TouchEvent) => void,
    onClick: (event: React.MouseEvent | React.TouchEvent) => void
) => {
    const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
    const onMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        setPosition(getMousePosition(event));
    };

    const onMouseUp = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        const newMousePosition = getMousePosition(event);
        const dist = computeDistance(position, newMousePosition);
        if (dist < 6) {
            onClick(event);
        } else {
            onDrag(event);
        }
    };

    return [onMouseDown, onMouseUp];
};

export default useClickOrDrag;
