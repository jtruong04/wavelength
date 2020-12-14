import { Point } from 'types';
import { getMousePosition } from 'utils/system';
import { clamp } from 'utils/generic';

function useDrag(
    boundingBoxRef: React.RefObject<HTMLDivElement>,
    setter: (newState: Point) => void,
    callback?: (releasePoint: Point) => void
) {
    const dragStart = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        const box = boundingBoxRef.current!.getBoundingClientRect();
        const moveHandler = (event: MouseEvent | TouchEvent) => {
            const mousePosition = getMousePosition(event);
            const newPosition = {
                x: clamp(
                    ((mousePosition.x - box.left) / box.width) * 100,
                    10,
                    90
                ),
                y: clamp(
                    ((mousePosition.y - box.top) / box.height) * 100,
                    10,
                    90
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
            if (callback) callback(mousePosition);
        };

        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
    };
    return dragStart;
}

export default useDrag;
