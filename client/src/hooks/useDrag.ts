import { Point } from 'types';
import { getMousePosition } from 'utils/system';
import { clamp, computeDistance } from 'utils/generic';

function useDrag(
    setter: (newState: Point) => void,
    onDragRelease?: (releasePoint: Point, initialPoint: Point) => any,
    onClick?: (releasePoint: Point, initialPoint: Point) => any
) {
    const dragStart = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        const self = event.currentTarget.getBoundingClientRect();
        const box = event.currentTarget.parentElement?.getBoundingClientRect() || {
            left: 0,
            width: 0,
            top: 0,
            height: 0,
        };
        // const box = boundingBoxRef.current!.getBoundingClientRect();
        const initPosition = getMousePosition(event);

        const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
            const mousePosition = getMousePosition(moveEvent);
            const newPosition = {
                x: clamp(
                    ((mousePosition.x - box.left) / box.width) * 100,
                    ((0.5 * self.width) / box.width) * 100,
                    ((box.width - 0.5 * self.width) / box.width) * 100
                ),
                y: clamp(
                    ((mousePosition.y - box.top) / box.height) * 100,
                    ((0.5 * self.height) / box.height) * 100,
                    ((box.height - 0.5 * self.height) / box.height) * 100
                ),
            };
            setter(newPosition);
        };
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('touchmove', moveHandler);

        const endDrag = (mouseUpEvent: TouchEvent | MouseEvent) => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchend', endDrag);
            const mousePosition = getMousePosition(mouseUpEvent);
            if (onClick && computeDistance(initPosition, mousePosition) < 6) {
                onClick(mousePosition, initPosition);
                return;
            }
            if (onDragRelease) onDragRelease(mousePosition, initPosition);
        };
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
    };
    return dragStart;
}

export default useDrag;
