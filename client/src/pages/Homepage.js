import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import { Grid, Link, Card, CardActionArea, Typography, Container, CardContent } from '@material-ui/core';
import Loader from "../global/Loader/Loader";
import { withTranslation } from "react-i18next";

function Homepage(props) {

    const { t } = props;
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
    <Container>
        <Grid container spacing={2}>
            {
                mountains.map(mountain => 
                    <Grid item md={3} xs={12}>
                        <Link underline="none" component={RouterLink}  to={ `/mountain/${ mountain.Mountain }` }>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            { mountain.Mountain }
                                        </Typography>

                                        <Typography variant="body1" color="textSecondary">
                                            { mountain.TrailCount }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                )
            }
        </Grid>
      </Container>
    )
}

export default withTranslation()(Homepage);