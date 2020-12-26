import { isBetween, selectRandomlyFromList } from './generic';
import { basic, advanced, colors } from 'assets/cards.json';
import { ICard } from 'types';
import { CardType } from 'enums';
// The active team tries to hit a bullseye
export function computeScoreForActiveTeam(
    guessedValue: number,
    targetValue: number,
    targetWidth: number,
    scores: number[]
): number {
    if (!isBetween(targetValue, 0, 180) || !isBetween(guessedValue, 0, 180)) {
        throw new Error(`Value must be between 0 and 180`);
    }
    if (targetWidth === 0) {
        return 0;
    }
    const valueDiff: number = Math.abs(guessedValue - targetValue);
    const score: number = Math.floor(valueDiff / targetWidth);
    return score < scores.length ? scores[score] : 0;
}

// The opposing team tries to guess if the active team is over or under the true value.
export function computeScoreForStandbyTeam(
    overUnderValue: number,
    guessedValue: number,
    targetValue: number,
    targetWidth: number
): number {
    if (!isBetween(targetValue, 0, 180) || !isBetween(guessedValue, 0, 180)) {
        throw new Error(`Value must be between 0 and 180`);
    }
    // If active team gets a bullseye, no points for other team
    const valueDiff: number = Math.abs(guessedValue - targetValue);
    if (Math.floor(valueDiff / targetWidth) === 0) {
        return 0;
    }
    // Otherwise, they get a point if the true value is between
    // their guess and the active team's guess.
    return isBetween(targetValue, overUnderValue, guessedValue) ? 1 : 0;
}

export function drawCard(options?: { level?: CardType }): ICard {
    let newCard: [string, string];
    switch (options?.level) {
        case CardType.BASIC:
            newCard = selectRandomlyFromList(basic).value as [string, string];
            break;
        case CardType.ADVANCED:
            newCard = selectRandomlyFromList(advanced).value as [
                string,
                string
            ];
            break;
        default:
            newCard = selectRandomlyFromList([...basic, ...advanced]).value as [
                string,
                string
            ];
            break;
    }
    return {
        text: newCard,
        color: selectRandomlyFromList(colors).value as [string, string],
    };
}

export function drawMultipleCards(num: number, options?: { level?: CardType }) {
    return Array.from({ length: num }, () => drawCard(options));
}
