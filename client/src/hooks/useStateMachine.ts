import {
    ClueAtom,
    ScreenAtom,
    SpectrumCardAtom,
    StateAtom,
    TargetAtom,
    TurnTrackerAtom,
    UserRoleSelector,
} from 'atoms/game';
import { GameEvents, Role, Screen, StateMachine } from 'enums';
import { useRecoilCallback } from 'recoil';
import { basic, advanced, colors } from 'assets/cards.json';
import { rollDie, selectRandomlyFromList } from 'utils/generic';
import socket from 'services/socket';
import produce, { Draft } from 'immer';
import { useCallback } from 'react';
import { RosterSizesSelector } from 'atoms/team';
export const useLobbyHandler = () => {
    const onLobbyEnter = useRecoilCallback(() => () => {}, []);
    const onLobbyExit = useRecoilCallback(
        ({ set, snapshot }) => async () => {
            const rosterSizes = await snapshot.getPromise(RosterSizesSelector);
            set(ScreenAtom, Screen.CLOSED);
            set(TurnTrackerAtom, {
                currentTeam: 0,
                currentPlayerOnEachTeam: Array(rosterSizes.length).fill(0),
            });
        },
        []
    );
    return [onLobbyEnter, onLobbyExit];
};

export const useForkHandler = () => {
    const onForkEnter = useRecoilCallback(() => () => {}, []);
    const onForkExit = useRecoilCallback(() => () => {}, []);
    return [onForkEnter, onForkExit];
};

export const useClueHandler = () => {
    const onClueEnter = useRecoilCallback(
        ({ set }) => () => {
            set(ScreenAtom, Screen.OPEN);
            set(TargetAtom, Math.random() * 180 + rollDie(10) * 360);
            set(SpectrumCardAtom, {
                text: selectRandomlyFromList([...advanced, ...basic]).value as [
                    string,
                    string
                ],
                color: selectRandomlyFromList(colors).value as [string, string],
            });
        },
        []
    );
    const onClueExit = useRecoilCallback(() => () => {}, []);
    return [onClueEnter, onClueExit];
};

export const useActiveHandler = () => {
    const onActiveEnter = useRecoilCallback(() => () => {}, []);
    const onActiveExit = useRecoilCallback(() => () => {}, []);

    return [onActiveEnter, onActiveExit];
};

export const useStandbyHandler = () => {
    const onStandbyEnter = useRecoilCallback(() => () => {}, []);
    const onStandbyExit = useRecoilCallback(() => () => {}, []);
    return [onStandbyEnter, onStandbyExit];
};

export const useRevealHandler = () => {
    const onRevealEnter = useRecoilCallback(
        ({ set }) => () => {
            set(ScreenAtom, Screen.OPEN);
            // TODO: Compute and modify scores
        },
        []
    );
    const onRevealExit = useRecoilCallback(
        ({ set, snapshot }) => async () => {
            const rosterSizes = await snapshot.getPromise(RosterSizesSelector);
            set(ClueAtom, '');
            set(
                TurnTrackerAtom,
                produce(
                    (
                        draft: Draft<{
                            currentTeam: number;
                            currentPlayerOnEachTeam: number[];
                        }>
                    ) => {
                        draft.currentPlayerOnEachTeam[draft.currentTeam] =
                            (draft.currentPlayerOnEachTeam[draft.currentTeam] +
                                1) %
                            rosterSizes[draft.currentTeam];
                        draft.currentTeam =
                            (draft.currentTeam + 1) % rosterSizes.length;
                        return draft;
                    }
                )
            );
        },
        []
    );
    return [onRevealEnter, onRevealExit];
};

const useStateMachine = () => {
    const getStateAfterFork = useCallback((role: Role) => {
        switch (role) {
            case Role.CLUE_GIVER:
                return StateMachine.CLUE;
            case Role.ACTIVE:
                return StateMachine.ACTIVE;
            case Role.STANDBY:
                return StateMachine.STANDBY;
            default:
                return null;
        }
    }, []);

    const goToNextState = useRecoilCallback(
        ({ snapshot, set }) => async (
            options?: {
                continue?: boolean;
            },
            preventBroadcast?: boolean
        ) => {
            const userRole = await snapshot.getPromise(UserRoleSelector);
            const currentState = await snapshot.getPromise(StateAtom);

            let nextState: StateMachine | null = null;
            switch (currentState) {
                case StateMachine.LOBBY:
                    nextState = StateMachine.FORK;
                    break;
                case StateMachine.FORK:
                    nextState = getStateAfterFork(userRole);
                    break;
                case StateMachine.CLUE:
                    nextState = StateMachine.REVEAL;
                    break;
                case StateMachine.ACTIVE:
                    nextState = StateMachine.REVEAL;
                    break;
                case StateMachine.STANDBY:
                    nextState = StateMachine.REVEAL;
                    break;
                case StateMachine.REVEAL:
                    nextState = options?.continue
                        ? StateMachine.FORK
                        : StateMachine.LOBBY;
                    break;
                default:
                    nextState = StateMachine.LOBBY;
                    break;
            }
            set(StateAtom, nextState!);
            if (!preventBroadcast) {
                socket.emit(GameEvents.NEXT, options);
            }
        },
        []
    );

    return goToNextState;
};

export default useStateMachine;
