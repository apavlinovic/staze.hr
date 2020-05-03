import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Container } from '@material-ui/core';

import TrailList from '../components/TrailList/TrailList';
import MountainsMenu from '../components/MountainsMenu/MountainsMenu';
import SEO from '../global/SEO/SEO';

function MountainTrails() {
    let { mountain } = useParams();

    return (
        <Container>
            <SEO title={mountain} />
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <MountainsMenu></MountainsMenu>
                </Grid>
                <Grid item md={8}>
                    <Typography gutterBottom variant="h4" component="h2">
                        {mountain}
                    </Typography>

                    <TrailList mountain={mountain}></TrailList>
                </Grid>
            </Grid>
        </Container>
    );
}

export default MountainTrails;
