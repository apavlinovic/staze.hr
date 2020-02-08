import React, { useState, useEffect } from "react";
import {
    useParams
  } from "react-router-dom";

import { Grid, Paper, Container, Breadcrumbs, Typography, Link, List, ListItem, ListItemText, ListSubheader, ListItemIcon } from '@material-ui/core';
import TrailDetails from "../components/TrailDetails";
import Loader from "../global/Loader/Loader";
import { Link as RouterLink } from 'react-router-dom';
import RateReviewIcon from '@material-ui/icons/RateReview';

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
      <Container>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <section>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link component={ RouterLink } color="inherit" to={ `/mountain/${ trail.Mountain }` }>
                        { trail.Mountain }
                    </Link>

                    <Typography color="textPrimary">{ trail.Name }</Typography>
                </Breadcrumbs>
            </section>
            
            <section>
              <Typography variant="h3" component="h1" gutterBottom>
                  { trail.Name }
              </Typography>
            </section>
          </Grid>
          <Grid item md={9}>
              <TrailDetails trail={ trail } />
          </Grid>
          <Grid item md={3}>
            <Paper>
              <List>

                <ListSubheader>
                  Akcije
                </ListSubheader>

                <ListItem>
                  <ListItemText>
                      Ocijeni
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                      Preuzmi GPS trag
                  </ListItemText>
                  <ListItemIcon>
                  </ListItemIcon>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
}

export default Trail;