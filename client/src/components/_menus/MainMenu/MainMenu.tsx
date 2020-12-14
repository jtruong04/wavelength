// Libraries
import React, { useState } from 'react';
// Material
import { Grid } from '@material-ui/core';
// Components
import HostMenu from './HostMenu';
import JoinMenu from './JoinMenu';
// Styling
import './Menus.css';

enum TabState {
    JOIN,
    HOST,
}

const MainMenu = () => {
    const [tab, setTab] = useState(TabState.HOST);

    return (
        <div className='menu-container'>
            <Grid container>
                <Grid item xs={6}>
                    <button
                        className={`tab`}
                        onClick={() => setTab(TabState.HOST)}
                    >
                        Host
                    </button>
                    <div
                        className={`underline ${
                            tab === TabState.HOST ? 'underlineActive' : ''
                        }`}
                    ></div>
                </Grid>
                <Grid item xs={6}>
                    <button
                        className={`tab`}
                        onClick={() => setTab(TabState.JOIN)}
                    >
                        Join
                    </button>
                    <div
                        className={`underline ${
                            tab === TabState.JOIN ? 'underlineActive' : ''
                        }`}
                    ></div>
                </Grid>
                <Grid item xs={12}>
                    {tab === TabState.JOIN ? <JoinMenu /> : ''}
                    {tab === TabState.HOST ? <HostMenu /> : ''}
                </Grid>
            </Grid>
        </div>
    );
};

export default MainMenu;
