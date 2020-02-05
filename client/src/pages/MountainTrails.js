import React, { useState, useEffect } from "react";
import {
    useParams
  } from "react-router-dom";

import TrailList from '../components/TrailList';
import MountainsMenu from '../components/MountainsMenu';
import { Grid, Typography } from '@material-ui/core';

function MountainTrails() {
    let { mountain } = useParams()

    return (
    <Grid container>
        <Grid item xs={4}>
            <MountainsMenu></MountainsMenu>
        </Grid>
        <Grid item xs={8}>
            <Typography gutterBottom variant="h4" component="h2">
              { mountain }
            </Typography>

            <TrailList mountain={mountain}></TrailList>
        </Grid>
      </Grid>
    )
}

export default MountainTrails;