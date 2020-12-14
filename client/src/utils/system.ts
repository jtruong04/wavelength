import { Point } from '../types';

export function getMousePosition(event: MouseEvent | TouchEvent): Point {
    let mousePosition: Point;
    if ('touches' in event) {
        mousePosition = {
            x: event.touches[0]?.clientX || event.changedTouches[0]?.clientX,
            y: event.touches[0]?.clientY || event.changedTouches[0]?.clientY,
        };
    } else {
        mousePosition = {
            x: event.clientX,
            y: event.clientY,
        };
    }
    return mousePosition;
}
