import React, { useState, useEffect } from "react";
import {
    useParams, Link
  } from "react-router-dom";

import { Grid, Paper } from '@material-ui/core';
import Loader from "../global/Loader/Loader";

function Homepage() {

    const [ isLoading, setLoading ] = useState(true);
    const [ mountains, setMountains ] = useState([]);

    useEffect(() => {
        fetch(`/api/mountains`)
            .then(res => res.json())
            .then((results) => {
                setMountains(results)
                setLoading(false)
            })
    }, [ true ]);


    if(isLoading)
        return <Loader></Loader>

    return (
      <Grid container spacing={2}>
          {
            mountains.map(mountain => 
                <Grid item xs={3}>
                    <Link to={ `/mountain/${ mountain.Mountain }` }>
                        <Paper>
                            { mountain.Mountain } ({ mountain.TrailCount })
                        </Paper>
                    </Link>
                </Grid>
            )
          }
        
      </Grid>
    )
}

export default Homepage;