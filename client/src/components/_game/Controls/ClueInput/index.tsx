// Libraries
import React from 'react';
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
// Services
// import socket from 'services/socket';
// Types
// import { ChatEvent } from 'enums';
// import useStateMachine from 'hooks/useStateMachine';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                width: '100%',
            },
        },
    })
);

interface Inputs {
    clue: string;
}

export default function Input() {
    const classes = useStyles();
    // const userid = useRecoilValue(MyID);
    // const goToNextState = useStateMachine();
    const { register, handleSubmit, reset } = useForm<Inputs>();

    const onSubmit = (data: Inputs) => {
        if (data.clue === '') return;
        // goToNextState({ submittedClue: data.clue });
        reset();
    };

    return (
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
    );
}
