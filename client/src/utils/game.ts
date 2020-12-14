import { isBetween } from './generic';

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
