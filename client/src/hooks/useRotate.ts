import { Point } from 'types';
import { getMousePosition } from 'utils/system';
import { computeAngle } from 'utils/generic';

function useRotate(
    pivotRef: React.RefObject<HTMLDivElement>,
    setter: (newState: number) => void,
    callback?: (releasePoint: Point) => any
) {
    const startDrag = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
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
            if (callback) callback(mousePosition);
        };
        document.addEventListener('mousemove', rotationHandler);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', rotationHandler);
        document.addEventListener('touchend', endDrag);
    };
    return startDrag;
}

export default useRotate;
