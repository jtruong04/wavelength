// Libraries
import React from 'react';
import { useForm } from 'react-hook-form';
// Material
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                width: '100%',
            },
            backgroundColor: 'white',
            opacity: '0.75',
        },
    })
);

export interface TextInputForm {
    input: string;
}

export interface TextInputProps {
    onSubmit: (data: TextInputForm) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ onSubmit }) => {
    const classes = useStyles();
    const { register, handleSubmit, reset } = useForm<TextInputForm>();
    const onClickSubmit = (data: TextInputForm) => {
        if (data.input === '') return;
        onSubmit(data);
        reset();
    };

    return (
        <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onClickSubmit)}
        >
            <TextField
                id="input"
                variant="outlined"
                inputRef={register}
                name="input"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton type="submit">
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    );
};

export default TextInput;
