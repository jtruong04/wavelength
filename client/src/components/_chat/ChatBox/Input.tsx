// Libraries
import React from 'react';
import { useForm } from 'react-hook-form';
// Recoil
import { useRecoilValue } from 'recoil';
import { UserIDState } from 'atoms/user';
// Material
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
// Services
import socket from 'services/socket';
// Types
import { ChatEvent } from 'enums';

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
    message: string;
}

export default function Input() {
    const classes = useStyles();
    const userid = useRecoilValue(UserIDState);
    const { register, handleSubmit, reset } = useForm<Inputs>();

    const onSubmit = (data: Inputs) => {
        if (data.message === '') return;
        socket.emit(ChatEvent.MESSAGE, { userid, body: data.message });
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
                id='message'
                variant='outlined'
                inputRef={register}
                name='message'
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
