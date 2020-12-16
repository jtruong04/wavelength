// Libraries
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { constantCase } from 'change-case';
// Recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserIDState, Me } from 'atoms/user';
import { RoomState } from 'atoms/room';
// Material
import { Button, TextField, Grid, IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// Components
import AvatarMenu from './AvatarMenu';
import Avatar from 'components/_common/Avatar';
// Styling
import './Menus.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
        text: {
            background: '#f0f0f0',
            borderRadius: '10px',
        },
        icon: {
            margin: 0,
            padding: 0,
        },
        submit: {
            margin: theme.spacing(2, 0, 1),
            borderRadius: '10px',
            background: 'rgb(133,177,161)',
            alignSelf: 'bottom',
        },
    })
);

const JoinMenu = () => {
    const classes = useStyles();

    const { register, handleSubmit } = useForm();
    const [avatar, setAvatar] = useState(99);
    const setRoom = useSetRecoilState(RoomState);

    const userid = useRecoilValue(UserIDState);
    const setMe = useSetRecoilState(Me);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (iconClicked: number) => {
        setAnchorEl(null);
        setAvatar(iconClicked);
    };

    const onSubmit = (data: { room: string; name: string }) => {
        if (data.name === '' || data.room === '') return;
        setMe({ name: data.name, avatar: avatar, id: userid, host: false });
        setRoom(constantCase(data.room));
    };
    return (
        <form className={classes.form} noValidate>
            <Grid
                container
                direction='column'
                justify='space-between'
                alignItems='center'
            >
                <Grid
                    container
                    spacing={1}
                    justify='space-between'
                    alignItems='center'
                >
                    <Grid item xs={10}>
                        <TextField
                            size='small'
                            className={classes.text}
                            inputRef={register}
                            variant='filled'
                            margin='normal'
                            required
                            fullWidth
                            id='name'
                            label='Name'
                            name='name'
                            autoFocus
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            onClick={handleClick}
                            className={classes.icon}
                        >
                            <Avatar
                                name={''}
                                avatar={avatar}
                                large
                                tooltip={false}
                            />
                        </IconButton>
                        <AvatarMenu
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                        />
                    </Grid>
                </Grid>
                <TextField
                    className={classes.text}
                    inputRef={register}
                    size='small'
                    variant='filled'
                    margin='normal'
                    required
                    fullWidth
                    id='room'
                    label='Game ID'
                    name='room'
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit(onSubmit)}
                    className={classes.submit}
                >
                    Play
                </Button>
            </Grid>
        </form>
    );
};

export default JoinMenu;
