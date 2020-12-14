import { atom } from 'recoil';
import { HighLow } from 'enums';
// import { RoomID } from 'types';

export const TargetState = atom<number>({
    key: 'target',
    default: 0,
});
export const DialState = atom<number>({
    key: 'dial',
    default: 90,
});
export const ShieldState = atom<boolean>({
    key: 'shield',
    default: true,
});
export const PromptsState = atom<{
    text: [string, string];
    color: [string, string];
}>({
    key: 'prompts',
    default: { text: ['Left', 'Right'], color: ['red', 'blue'] },
});
export const ClueState = atom<string>({
    key: 'clue',
    default: '',
});
export const OverUnderState = atom<HighLow>({
    key: 'overunder',
    default: HighLow.LOW,
});
// export const TokenStates = atomFamily<Point, UserID>({
//     key: 'token position',
//     default: {
//         x: Math.random() * 10 + 45,
//         y: Math.random()*50 + 25,
//     },
// });
