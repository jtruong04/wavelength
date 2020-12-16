import { Point } from 'types';
import { getMousePosition } from 'utils/system';
import { computeAngle, computeDistance } from 'utils/generic';

function useRotate(
    setter: (newState: number) => void,
    onDragRelease?: (
        releasePoint: Point,
        initialPoint: Point,
        pivotPoint: Point
    ) => any,
    onClick?: (
        releasePoint: Point,
        initialPoint: Point,
        pivotPoint: Point
    ) => any
) {
    const handleDrag = (
        event: React.MouseEvent | React.TouchEvent,
        pivotRef: React.RefObject<HTMLDivElement>
    ) => {
        event.preventDefault();
        const initPosition = getMousePosition(event);
        const knob = pivotRef.current!.getBoundingClientRect();
        const knobCenter: Point = {
            x: knob.left + knob.width / 2,
            y: knob.top + knob.height / 2,
        };
        const rotationHandler = (event: MouseEvent | TouchEvent) => {
            const mousePosition = getMousePosition(event);
            let newAngle = computeAngle(knobCenter, mousePosition) - 180;
            if (newAngle < -90) newAngle = 180;
            if (newAngle < 0) newAngle = 0;
            setter(newAngle);
            // socket.emit(GameEvent.DIAL_TURN, room, newAngle);
        };
        const endDrag = (event: MouseEvent | TouchEvent) => {
            document.removeEventListener('mousemove', rotationHandler);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchmove', rotationHandler);
            document.removeEventListener('touchend', endDrag);
            const mousePosition = getMousePosition(event);
            if (onClick && computeDistance(initPosition, mousePosition) < 6) {
                onClick(mousePosition, initPosition, knobCenter);
                return;
            }
            if (onDragRelease) {
                onDragRelease(mousePosition, initPosition, knobCenter);
            }
        };
        document.addEventListener('mousemove', rotationHandler);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', rotationHandler);
        document.addEventListener('touchend', endDrag);
    };
    return handleDrag;
}

export default useRotate;
