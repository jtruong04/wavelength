// Libraries
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// Material
import { TextField, Grid, IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// Recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MyIDAtom, PlayerListAtom, UserSelector } from 'atoms/user';
import { RoomAtom } from 'atoms/room';
// Components
import AvatarMenu from './AvatarMenu';
import Avatar from 'components/_common/Avatar';
import Button from 'components/_common/Button';
// Services
import api from 'services/api';
// Styling
import './Menus.css';
import { SocketEvent } from 'enums';
import socket from 'services/socket';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: '100%', // Fix IE 11 issue.
            height: '100%',
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
        toggle: {
            borderRadius: '10px',
            color: 'white',
        },
        submit: {
            margin: theme.spacing(2, 0, 1),
            borderRadius: '10px',
            background: 'rgb(133,177,161)',
            alignSelf: 'bottom',
        },
    })
);

const HostMenu = () => {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const userid = useRecoilValue(MyIDAtom);
    const setUser = useSetRecoilState(UserSelector);
    const setPlayerList = useSetRecoilState(PlayerListAtom);
    const setRoom = useSetRecoilState(RoomAtom);
    const [avatar, setAvatar] = useState(99);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (iconClicked: number) => {
        setAnchorEl(null);
        setAvatar(iconClicked);
    };
    const onSubmit = async (data: { name: string }) => {
        if (data.name === '') return;
        const newRoom = await api.getRoomID();
        socket.emit(
            SocketEvent.JOIN_ROOM,
            {
                room: newRoom.toUpperCase(),
                userid,
            },
            () => {
                setUser({
                    name: data.name,
                    avatarid: avatar,
                    id: userid,
                    host: true,
                });
                setPlayerList((current) => [...current, userid]);
                setRoom(newRoom.toUpperCase());
            }
        );
        // setUser({ name: data.name, avatarid: avatar, id: userid, host: true });
        // setRoom(newRoom);
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
                            <Avatar name={''} avatarid={avatar} large />
                        </IconButton>
                        <AvatarMenu
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                        />
                    </Grid>
                </Grid>
                <Button
                    // type='submit'
                    // fullWidth
                    // variant='contained'
                    // color='primary'
                    onClick={handleSubmit(onSubmit)}
                    // className={classes.submit}
                >
                    Play
                </Button>
            </Grid>
        </form>
    );
};

export default HostMenu;
