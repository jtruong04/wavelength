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
        <Grid
            container
            className={classes.root}
            direction='row'
            justify='center'
            alignItems='stretch'
        >
            <Grid item xs={12} md={7}>
                <div
                    style={{
                        display: 'flex',
                        padding: '10%',
                        margin: 'auto',
                        // maxWidth: '600px',
                        width: '60%',
                    }}
                >
                    <Game />
                </div>
            </Grid>
            <Grid item xs={12} md={5}>
                <div
                    style={{
                        // display: 'flex',
                        padding: '5%',
                        margin: 'auto',
                        // maxWidth: '600px',
                        width: '80%',
                    }}
                >
                    <ChatBox />
                </div>
            </Grid>
        </Grid>
    );
};

export default GamePage;
