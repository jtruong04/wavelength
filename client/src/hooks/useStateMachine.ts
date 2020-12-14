import { useEffect } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import {
    ActiveTeam,
    GameOptions,
    IsClueGiver,
    StandbyTeam,
    StateMachine,
    TurnTracker,
} from 'atoms/stateMachine';
import { DialState, PromptsState, TargetState, ClueState } from 'atoms/ui';

import { GameEvents, HighLow, State, TeamID } from 'enums';
import { HostState, Roster, ScoreState } from 'atoms/user';
import { selectRandomlyFromList } from 'utils/generic';
import { basic, advanced, colors } from 'assets/cards.json';
import {
    computeScoreForActiveTeam,
    computeScoreForStandbyTeam,
} from 'utils/game';
import socket from 'services/socket';

function useStateMachine() {
    const setTeamATurn = useSetRecoilState(TurnTracker(TeamID.A));
    const setTeamBTurn = useSetRecoilState(TurnTracker(TeamID.B));
    const setClue = useSetRecoilState(ClueState);
    const setTarget = useSetRecoilState(TargetState);
    const setCard = useSetRecoilState(PromptsState);

    const goToNextState = useRecoilCallback(
        ({ snapshot, set }) => async (
            options?: {
                submittedClue?: string;
                highlow?: HighLow;
                continue?: boolean;
            },
            preventBroadcast?: boolean
        ) => {
            const currentState = await snapshot.getPromise(StateMachine);
            const rosterA = await snapshot.getPromise(Roster(TeamID.A));
            const rosterB = await snapshot.getPromise(Roster(TeamID.B));
            const isHost = await snapshot.getPromise(HostState);
            const isClueGiver = await snapshot.getPromise(IsClueGiver);
            const dial = await snapshot.getPromise(DialState);
            const target = await snapshot.getPromise(TargetState);
            const gameOptions = await snapshot.getPromise(GameOptions);
            let activeTeam = await snapshot.getPromise(ActiveTeam);
            let standbyTeam = await snapshot.getPromise(StandbyTeam);
            let aClueGiver = await snapshot.getPromise(TurnTracker(TeamID.A));
            let bClueGiver = await snapshot.getPromise(TurnTracker(TeamID.B));

            let nextState = null;
            // Run any onExit methods
            switch (currentState) {
                case State.LOBBY:
                    if (isHost) {
                        // randomly decide starting team
                        activeTeam = selectRandomlyFromList([
                            TeamID.A,
                            TeamID.B,
                        ]).value;
                        // randomly decide starting player for each team
                        aClueGiver = selectRandomlyFromList(rosterA).index;
                        bClueGiver = selectRandomlyFromList(rosterB).index;
                        set(TurnTracker(TeamID.A), aClueGiver);
                        set(TurnTracker(TeamID.B), bClueGiver);
                        // if (!preventBroadcast) {
                        socket.emit(GameEvents.SET_TEAM_A_TURN, aClueGiver);
                        socket.emit(GameEvents.SET_TEAM_B_TURN, bClueGiver);
                        // }
                    }
                    // if (isClueGiver) {
                    nextState = State.CLUE;
                    // } else {
                    //     nextState = State.DELIBERATION_ACTIVE;
                    // }
                    break;
                case State.CLUE:
                    if (isClueGiver) {
                        set(ClueState, options?.submittedClue || '');
                        // if (!preventBroadcast) {
                        socket.emit(
                            GameEvents.CLUE_SUBMITTED,
                            options?.submittedClue || ''
                        );
                        // }
                    }
                    nextState = State.DELIBERATION_ACTIVE;
                    break;
                case State.DELIBERATION_ACTIVE:
                    nextState = State.DELIBERATION_STANDBY;
                    break;
                case State.DELIBERATION_STANDBY:
                    nextState = State.REVEAL;
                    break;
                case State.REVEAL:
                    if (options?.continue) {
                        nextState = State.CLUE;
                        if (activeTeam === TeamID.A) {
                            aClueGiver = (aClueGiver + 1) % rosterA.length;
                            set(TurnTracker(TeamID.A), aClueGiver);
                        } else {
                            bClueGiver = (bClueGiver + 1) % rosterB.length;
                            set(TurnTracker(TeamID.B), bClueGiver);
                        }
                        [activeTeam, standbyTeam] = [standbyTeam, activeTeam];
                        set(ActiveTeam, activeTeam);
                    } else {
                        nextState = State.LOBBY;
                    }
                    break;
                default:
                    break;
            }
            set(StateMachine, nextState || State.LOBBY);
            // Run any onEnter methods
            switch (nextState) {
                case State.LOBBY:
                    break;
                case State.CLUE:
                    // Go to next player
                    if (isClueGiver) {
                        // Randomly select card from list
                        const newCard = {
                            text: selectRandomlyFromList([
                                ...basic,
                                ...advanced,
                            ]).value as [string, string],
                            color: selectRandomlyFromList(colors).value as [
                                string,
                                string
                            ],
                        };
                        set(PromptsState, newCard);

                        // Spin target
                        const spin =
                            Math.floor(Math.random() * 10) * 360 +
                            Math.random() * 180;
                        // const spin = 90;
                        set(TargetState, spin);
                        // if (!preventBroadcast) {
                        socket.emit(GameEvents.DRAW_CARD, newCard);
                        socket.emit(GameEvents.SET_TARGET, spin);
                        // }
                    }
                    break;
                case State.DELIBERATION_ACTIVE:
                    break;
                case State.DELIBERATION_STANDBY:
                    break;
                case State.REVEAL:
                    // Compute scores
                    const activeScore = computeScoreForActiveTeam(
                        dial,
                        target % 180,
                        gameOptions.targetWidth,
                        gameOptions.targetScores
                    );
                    const standbyScore = computeScoreForStandbyTeam(
                        options?.highlow || 0,
                        dial,
                        target % 180,
                        gameOptions.targetWidth
                    );
                    set(
                        ScoreState(activeTeam),
                        (currValue) => currValue + activeScore
                    );
                    set(
                        ScoreState(standbyTeam),
                        (currValue) => currValue + standbyScore
                    );
                    break;
                default:
                    break;
            }
            if (!preventBroadcast) {
                socket.emit(GameEvents.NEXT_STATE, options);
            }
            // console.log({
            //     nextState,
            //     isHost,
            //     isClueGiver,
            //     dial,
            //     target,
            //     activeTeam,
            // });
        }
    );
    useEffect(() => {
        if (!socket.hasListeners(GameEvents.SET_TEAM_A_TURN)) {
            socket.on(GameEvents.SET_TEAM_A_TURN, (payload: number) => {
                setTeamATurn(payload);
            });
        }
        if (!socket.hasListeners(GameEvents.SET_TEAM_B_TURN)) {
            socket.on(GameEvents.SET_TEAM_B_TURN, (payload: number) => {
                setTeamBTurn(payload);
            });
        }
        if (!socket.hasListeners(GameEvents.CLUE_SUBMITTED)) {
            socket.on(GameEvents.CLUE_SUBMITTED, (payload: string) => {
                setClue(payload);
            });
        }
        if (!socket.hasListeners(GameEvents.SET_TARGET)) {
            socket.on(GameEvents.SET_TARGET, (payload: number) => {
                setTarget(payload);
            });
        }
        if (!socket.hasListeners(GameEvents.DRAW_CARD)) {
            socket.on(
                GameEvents.DRAW_CARD,
                (payload: {
                    text: [string, string];
                    color: [string, string];
                }) => {
                    setCard(payload);
                }
            );
        }
        if (!socket.hasListeners(GameEvents.NEXT_STATE)) {
            socket.on(
                GameEvents.NEXT_STATE,
                (payload: {
                    submittedClue?: string;
                    highlow?: HighLow;
                    continue?: boolean;
                }) => {
                    goToNextState(payload, true);
                }
            );
        }
        // return () => {
        //     socket.removeListener(GameEvents.SET_TEAM_A_TURN);
        //     socket.removeListener(GameEvents.SET_TEAM_B_TURN);
        //     socket.removeListener(GameEvents.CLUE_SUBMITTED);
        //     socket.removeListener(GameEvents.SET_TARGET);
        //     socket.removeListener(GameEvents.DRAW_CARD);
        //     socket.removeListener(GameEvents.NEXT_STATE);
        // };
    }, [
        goToNextState,
        setCard,
        setClue,
        setTarget,
        setTeamATurn,
        setTeamBTurn,
    ]);

    return goToNextState;
}

export default useStateMachine;
