import { ClueAtom, ReadyAtom } from 'atoms/game';
import Button from 'components/_common/Button';
import Typography from 'components/_common/Typography';
import { useActiveHandler } from 'hooks/useStateMachine';
import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
const Active = () => {
    const [onActiveEnter, onActiveExit] = useActiveHandler();
    const clue = useRecoilValue(ClueAtom);
    const [ready, setReady] = useRecoilState(ReadyAtom);
    useEffect(() => {
        onActiveEnter();
        return () => {
            onActiveExit();
        };
    }, [onActiveEnter, onActiveExit]);

    const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setReady(true);
    };

    if (clue) {
        return (
            <div>
                <Typography size='xx-large'>{clue.toUpperCase()}</Typography>
                {!ready && <Button onClick={handleClick}>Submit</Button>}
            </div>
        );
    }
    return null;
};

export default Active;
