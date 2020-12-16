import { Point } from 'types';
import { getMousePosition } from 'utils/system';
import { clamp, computeDistance } from 'utils/generic';

function useDrag(
    setter: (newState: Point) => void,
    onDragRelease?: (releasePoint: Point, initialPoint: Point) => any,
    onClick?: (releasePoint: Point, initialPoint: Point) => any
) {
    const dragStart = (
        event: React.MouseEvent | React.TouchEvent,
        boundingBoxRef: React.RefObject<HTMLDivElement>
    ) => {
        event.preventDefault();
        const self = event.currentTarget.getBoundingClientRect();
        // console.log(self);
        const box = boundingBoxRef.current!.getBoundingClientRect();
        const initPosition = getMousePosition(event);

        const moveHandler = (event: MouseEvent | TouchEvent) => {
            const mousePosition = getMousePosition(event);
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

        const endDrag = (event: TouchEvent | MouseEvent) => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchend', endDrag);
            const mousePosition = getMousePosition(event);
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
