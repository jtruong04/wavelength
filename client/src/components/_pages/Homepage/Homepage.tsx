// Libraries
import React from 'react';
// Material
import { Grid } from '@material-ui/core';
// Components
import { MainMenu } from 'components/_menus/MainMenu';
// Styling
import './Homepage.css';

const Homepage = () => {
    return (
        <Grid container direction='column' justify='center' alignItems='center'>
            <Grid item xs={12}>
                <h1>Wavelength</h1>
            </Grid>
            <Grid item xs={12}>
                <MainMenu />
            </Grid>
        </Grid>
    );
};

export default Homepage;
