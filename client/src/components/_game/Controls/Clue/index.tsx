// Libraries
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// Recoil
// import { useRecoilValue } from 'recoil';
// import { MyID } from 'atoms/user';
// Material
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { useClueHandler } from 'hooks/useStateMachine';
import { ClueAtom, ReadyAtom, ScreenAtom } from 'atoms/game';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Typography from 'components/_common/Typography';
import Button from 'components/_common/Button';
// Services
// import socket from 'services/socket';
// Types
import { Screen } from 'enums';
import useStateMachine from 'hooks/useStateMachine';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                width: '100%',
            },
            '& .MuiInputBase-root': { backgroundColor: 'white' },
        },
    })
);

interface Inputs {
    clue: string;
}

export default function Input() {
    const classes = useStyles();
    const [clue, setClue] = useRecoilState(ClueAtom);
    // const userid = useRecoilValue(MyID);
    const setScreen = useSetRecoilState(ScreenAtom);
    const goToNextState = useStateMachine();
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const ready = useRecoilValue(ReadyAtom);

    const onSubmit = (data: Inputs) => {
        if (data.clue === '') return;
        setClue(data.clue);
        setScreen(Screen.CLOSED);
        reset();
    };

    const [onClueEnter, onClueExit] = useClueHandler();

    useEffect(() => {
        onClueEnter();
        return () => {
            onClueExit();
        };
    }, [onClueEnter, onClueExit]);

    // const handleClick = () => {
    //     goToNextState();
    // };

    if (clue) {
        return (
            <>
                <Typography size='xx-large'>{clue.toUpperCase()}</Typography>
                {ready && <Typography>Open the screen to continue.</Typography>}
            </>
        );
    }

    return (
        <>
            <form
                className={classes.root}
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    id='clue'
                    variant='outlined'
                    inputRef={register}
                    name='clue'
                    label='Clue'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton type='submit'>
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
        </>
    );
}
