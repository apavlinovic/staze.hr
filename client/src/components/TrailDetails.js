import React, { useState, useEffect } from "react";
import { withTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LaunchIcon from '@material-ui/icons/Launch';
import { Card, CardContent, Grid, CardActions, Button, Container } from "@material-ui/core";
import Loader from "../global/Loader/Loader";
import Typography from '@material-ui/core/Typography';
import { prettyPrintCoordinates, renderNavigateToCoordinatesLink } from "../global/Helpers";

function TrailDetails(props) {
    const { slug, mountain, t } = props;
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
    <section>
        <Container>
            <Typography variant="h3" component="h1" gutterBottom>
                { trail.Name }
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                { t('strings.trail_description') }
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="body1">
                        { trail.Description }
                    </Typography>
                </CardContent>
            </Card>

            <Typography variant="h5" component="h2" gutterBottom> 
                { t('strings.important_coordinates') }
            </Typography>

            <Grid container spacing={1}>
                <Grid item xs={ 6 }>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" component="h2" color="textSecondary" gutterBottom>
                                {t('noun.start_coordinates')}
                            </Typography>
                            <Typography variant="h5">
                                { prettyPrintCoordinates(trail.StartLocationCoords.coordinates[1]) }, { prettyPrintCoordinates(trail.StartLocationCoords.coordinates[0]) }
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" href={ renderNavigateToCoordinatesLink(trail.StartLocationCoords) } target="_blank">
                                { t('verb.navigate') } <LaunchIcon></LaunchIcon>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={ 6 }>
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1" component="h2" color="textSecondary" gutterBottom>
                                {t('noun.end_coordinates')}
                            </Typography>
                            <Typography variant="h5">
                                { prettyPrintCoordinates(trail.EndLocationCoords.coordinates[1]) }, { prettyPrintCoordinates(trail.EndLocationCoords.coordinates[0]) }
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" href={ renderNavigateToCoordinatesLink(trail.EndLocationCoords) } target="_blank">
                                { t('verb.navigate') } <LaunchIcon></LaunchIcon>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        { t('strings.coordinates_disclaimer') }
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="h5" component="h2" gutterBottom>
                { t('strings.trail_information') }
            </Typography>
            
            <section>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">{ t('noun.duration') }</TableCell>
                                <TableCell>{ trail.Duration }h</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">{ t('noun.distance') }</TableCell>
                                <TableCell>{ trail.Distance }km</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">{ t('noun.height_difference') }</TableCell>
                                <TableCell>{ trail.HeightDifference }m</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">{ t('noun.mountain') }</TableCell>
                                <TableCell>{ trail.Mountain }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">{ t('noun.start_location') }</TableCell>
                                <TableCell>{ trail.StartLocation }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">{ t('verb.maintains') }</TableCell>
                                <TableCell>{ trail.Maintainer }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">{ t('strings.related_information') }</TableCell>
                                <TableCell>
                                    <a href={ trail.RelatedInformationLink } target="_blank">
                                        <Button size="small">
                                            { t('noun.link') } <LaunchIcon></LaunchIcon>
                                        </Button>
                                    </a>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
        </Container>
    </section>
    )
}

export default withTranslation()(TrailDetails);