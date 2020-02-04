import React, { useState, useEffect } from "react";
import {
    useParams
  } from "react-router-dom";

import { Grid } from '@material-ui/core';
import TrailDetails from "../components/TrailDetails";

function Trail() {
    let { slug } = useParams()

    return (
    <Grid container>
        <Grid item xs={12}>
            <TrailDetails slug={ slug } />
        </Grid>
      </Grid>
    )
}

export default Trail;