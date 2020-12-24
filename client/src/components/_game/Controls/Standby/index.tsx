// import { HighLow } from 'enums';
import { ClueAtom, OverUnderAtom } from 'atoms/game';
import Button from 'components/_common/Button';
import Typography from 'components/_common/Typography';
import { OverUnder } from 'enums';
import { useStandbyHandler } from 'hooks/useStateMachine';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
// import useStateMachine from 'hooks/useStateMachine';

const Standby = () => {
    const [onStandbyEnter, onStandbyExit] = useStandbyHandler();
    const clue = useRecoilValue(ClueAtom);
    const [overUnder, setOverUnder] = useRecoilState(OverUnderAtom);
    useEffect(() => {
        onStandbyEnter();
        return () => {
            onStandbyExit();
        };
    }, [onStandbyEnter, onStandbyExit]);

    // const goToNextState = useStateMachine();
    const handleOver = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setOverUnder(OverUnder.OVER);
        // goToNextState({ highlow: HighLow.LOW });
    };
    const handleUnder = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setOverUnder(OverUnder.UNDER);

        // goToNextState({ highlow: HighLow.HIGH });
    };
    return (
        <>
            <Typography size='xx-large'>{clue.toUpperCase()}</Typography>
            <Typography>
                Is the other team over or the under the true value?
            </Typography>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    // padding: '0 10%',
                }}
            >
                <div
                    style={{
                        // width: '90%',
                        margin: '0 1%',
                    }}
                >
                    <Button
                        onClick={handleOver}
                        color={
                            overUnder === OverUnder.UNDER
                                ? '#808080'
                                : undefined
                        }
                    >
                        Over
                    </Button>
                </div>
                <div
                    style={{
                        // width: '90%',
                        margin: '0 1%',
                    }}
                >
                    <Button
                        onClick={handleUnder}
                        color={
                            overUnder === OverUnder.OVER ? '#808080' : undefined
                        }
                    >
                        Under
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Standby;
