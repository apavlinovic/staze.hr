import React, { useState, useEffect } from "react";
import {
    useParams
  } from "react-router-dom";

import { Grid, Paper } from '@material-ui/core';
import TrailDetails from "../components/TrailDetails";
import Loader from "../global/Loader/Loader";

function Trail() {
    let { slug } = useParams()

    const [ isLoading, setLoading ] = useState(true);
    const [ trail, setTrail ] = useState({});

    useEffect(() => {
        fetch(`/api/trail/${ slug }`)
            .then(res => res.json())
            .then((result) => {
                setTrail(result)
                setLoading(false)
            })
    }, [ slug ]);


    if(isLoading)
        return <Loader></Loader>

    return (
      <Grid container>
        <Grid item xs={9}>
            <TrailDetails trail={ trail } />
        </Grid>
        <Grid item xs={3}>
          <Paper>
            TODO: Ocijeni ovaj trail
            <hr />
            TODO: Podijeli ovaj trail
            <hr />
            TODO: Nearby staze na ovoj planini
          </Paper>
        </Grid>
      </Grid>
    )
}

export default Trail;