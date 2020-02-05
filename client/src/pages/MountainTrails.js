import React, { useState, useEffect } from "react";
import {
    useParams
  } from "react-router-dom";

import TrailList from '../components/TrailList';
import MountainsMenu from '../components/MountainsMenu';
import { Grid, Typography, Container } from '@material-ui/core';

function MountainTrails() {
    let { mountain } = useParams()

    return (
      <Container>
        <Grid container spacing={ 2 } >
            <Grid item md={4}>
                <MountainsMenu></MountainsMenu>
            </Grid>
            <Grid item md={8}>
                <Typography gutterBottom variant="h4" component="h2">
                  { mountain }
                </Typography>

                <TrailList mountain={mountain}></TrailList>
            </Grid>
          </Grid>
      </Container>
    )
}

export default MountainTrails;