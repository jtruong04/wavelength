import { ClueAtom } from 'atoms/game';
import Typography from 'components/_common/Typography';
import { useActiveHandler } from 'hooks/useStateMachine';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
const Active = () => {
    // const goToNextState = useStateMachine();
    const [onActiveEnter, onActiveExit] = useActiveHandler();
    const clue = useRecoilValue(ClueAtom);

    useEffect(() => {
        onActiveEnter();
        return () => {
            onActiveExit();
        };
    }, [onActiveEnter, onActiveExit]);

    // const handleSubmit = (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     // goToNextState();
    // };

    return <Typography size='xx-large'>{clue.toUpperCase()}</Typography>;
};

export default Active;
