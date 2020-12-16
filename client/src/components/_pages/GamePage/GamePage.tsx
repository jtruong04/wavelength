// Libraries
import React from 'react';
// Material
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// Components
import ChatBox from 'components/_chat/ChatBox';
import Game from 'components/_game/Game';
// Hooks
import useJoinRoom from 'hooks/useJoinRoom';
// Styling
import './GamePage.css';
// import { useRecoilValue } from 'recoil';
// import { PlayerListState } from 'atoms/user';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    })
);

const GamePage = () => {
    const classes = useStyles();
    useJoinRoom();

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                justify='space-evenly'
                alignItems='center'
            >
                <Grid
                    item
                    container
                    xs={12}
                    md={7}
                    direction='column'
                    justify='center'
                    alignItems='center'
                >
                    <Game />
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    md={5}
                    direction='column'
                    justify='center'
                    alignItems='center'
                >
                    <ChatBox />
                </Grid>
            </Grid>
        </div>
    );
};

export default GamePage;
