// import {
//     StateMachine,
//     // ClueGiver,
//     IsClueGiver,
//     ActiveTeam,
// } from 'atoms/stateMachine';
// import { TargetState } from 'atoms/ui';
// import { useRecoilValue } from 'recoil';
// import { Roster, UserIDState } from 'atoms/user';
// import useStateMachine from 'hooks/useStateMachine';
import React from 'react';
import Dial from './Dial/Dial';
// import ClueInput from './Controls/ClueInput';
// import TeamSelection from './Controls/TeamSelection/TeamSelection';
// // import { useSocketRecoilFamily } from 'hooks/useSocketRecoilState';
// import { State } from 'enums';
// import ActiveDeliberation from './Controls/Deliberation/ActiveDeliberation';
// import StandbyDeliberation from './Controls/Deliberation/StandbyDeliberation';
// import Reveal from './Controls/Reveal';
// import Card from './Card/Card';
// import { ClueState } from 'atoms/ui';

const Game = () => {
    // const goToNextState = useStateMachine();

    // const userid = useRecoilValue(UserIDState);
    // const currentState = useRecoilValue(StateMachine);
    // const clueGiverID = useRecoilValue(ClueGiver);
    // const clueGiver = useRecoilValue(PlayerState(clueGiverID));
    // const activeTeam = useRecoilValue(ActiveTeam);
    // const activeRoster = useRecoilValue(Roster(activeTeam));
    // const isClueGiver = useRecoilValue(IsClueGiver);
    // const clue = useRecoilValue(ClueState);
    // const target = useRecoilValue(TargetState);
    // const prompts = useRecoilValue(PromptsState);

    // const renderState = (state: State) => {
    //     switch (state) {
    //         case State.LOBBY:
    //             return <TeamSelection />;
    //         case State.CLUE:
    //             if (isClueGiver) {
    //                 return <ClueInput />;
    //             } else {
    //                 return null;
    //             }
    //         case State.DELIBERATION_ACTIVE:
    //             if (activeRoster.includes(userid)) {
    //                 return <ActiveDeliberation />;
    //             } else {
    //                 return null;
    //             }
    //         case State.DELIBERATION_STANDBY:
    //             if (!activeRoster.includes(userid)) {
    //                 return <StandbyDeliberation />;
    //             } else {
    //                 return null;
    //             }
    //         case State.REVEAL:
    //             return <Reveal />;
    //         default:
    //             return null;
    //     }
    // };

    // const renderClueCard = (state: State) => {
    //     switch (state) {
    //         case State.LOBBY:
    //             return null;
    //         case State.CLUE:
    //         case State.DELIBERATION_ACTIVE:
    //         case State.DELIBERATION_STANDBY:
    //         case State.REVEAL:
    //             return (
    //                 <div style={{ width: '60%' }}>
    //                     <Card />
    //                 </div>
    //             );
    //         default:
    //             return null;
    //     }
    // };

    // const renderClue = (state: State, clue: string) => {
    //     switch (state) {
    //         case State.LOBBY:
    //         case State.CLUE:
    //         case State.REVEAL:
    //             return null;
    //         case State.DELIBERATION_ACTIVE:
    //         case State.DELIBERATION_STANDBY:
    //             return (
    //                 <div>
    //                     <p>{clue}</p>
    //                 </div>
    //             );
    //         default:
    //             return null;
    //     }
    // };

    // const handleClick = (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     goToNextState({ continue: true });
    // };
    return <Dial />;
};

export default Game;
