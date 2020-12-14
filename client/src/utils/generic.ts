import { Point } from 'types';

export function clamp(val: number, min: number, max: number) {
    return Math.max(Math.min(val, max), min);
}

export function isBetween(val: number, a: number, b: number) {
    return (a <= val && val <= b) || (b <= val && val <= a);
}

export function flipCoin() {
    return Math.floor(Math.random() * 2) === 1;
}

export function dieRoll(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function selectRandomlyFromList<T>(list: T[]) {
    const randomValue = dieRoll(list.length);
    return { value: list[randomValue], index: randomValue };
}

export function computeAngle(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (angle < 0) return angle + 360;
    return angle;
}
