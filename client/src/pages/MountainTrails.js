import React, { useState, useEffect } from "react";
import {
    useParams
  } from "react-router-dom";

import Trails from '../components/Trails';
import MountainsMenu from '../components/MountainsMenu';
import { Grid } from '@material-ui/core';

function MountainTrails() {
    let { mountain } = useParams()

    return (
    <Grid container>
        <Grid item xs={4}>
            <MountainsMenu></MountainsMenu>
        </Grid>
        <Grid item xs={8}>
            <Trails mountain={mountain}></Trails>
        </Grid>
      </Grid>
    )
}

export default MountainTrails;