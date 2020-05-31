import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LaunchIcon from '@material-ui/icons/Launch';
import {
    Card,
    CardContent,
    Grid,
    CardActions,
    Button,
    Container,
    Breadcrumbs,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {
    prettyPrintCoordinates,
    renderNavigateToCoordinatesLink,
    mapImageUrl,
    mapGraphUrl,
} from '../../global/Helpers';

import './TrailDetails.scss';

function TrailDetails(props) {
    const { trail, t } = props;

    return (
        <section className="ui--TrailDetails">
            <section>
                <Paper>
                    <img src={mapImageUrl(trail.MapName)} alt={trail.Name} />
                </Paper>
            </section>

            <section>
                <Typography variant="h5" component="h2" gutterBottom>
                    {t('strings.trail_description')}
                </Typography>
                <Card>
                    <CardContent>
                        <Typography variant="body1">{trail.Description}</Typography>
                    </CardContent>
                </Card>
            </section>

            <section>
                <Typography variant="h5" component="h2" gutterBottom>
                    {t('strings.important_coordinates')}
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography
                                    variant="subtitle1"
                                    component="h2"
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    {t('noun.start_coordinates')}
                                </Typography>
                                <Typography variant="h5">
                                    {prettyPrintCoordinates(trail.StartLocationCoords.coordinates)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    endIcon={<LaunchIcon />}
                                    color="primary"
                                    href={renderNavigateToCoordinatesLink(
                                        trail.StartLocationCoords,
                                    )}
                                    target="_blank"
                                >
                                    {t('verb.navigate')}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography
                                    variant="subtitle1"
                                    component="h2"
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    {t('noun.end_coordinates')}
                                </Typography>
                                <Typography variant="h5">
                                    {prettyPrintCoordinates(trail.EndLocationCoords.coordinates)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    endIcon={<LaunchIcon />}
                                    color="primary"
                                    href={renderNavigateToCoordinatesLink(trail.EndLocationCoords)}
                                    target="_blank"
                                >
                                    {t('verb.navigate')}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" gutterBottom>
                            {t('strings.coordinates_disclaimer')}
                        </Typography>
                    </Grid>
                </Grid>
            </section>

            <section>
                <Typography variant="h5" component="h2" gutterBottom>
                    {t('strings.trail_information')}
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {t('noun.duration')}
                                </TableCell>
                                <TableCell>
                                    {trail.Duration ? <>{trail.Duration} h</> : <>-</>}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {t('noun.distance')}
                                </TableCell>
                                <TableCell>
                                    {trail.Distance ? <>{trail.Distance} km</> : <>-</>}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {t('noun.height_difference')}
                                </TableCell>
                                <TableCell>
                                    {trail.HeightDifference ? (
                                        <>{trail.HeightDifference} m</>
                                    ) : (
                                        <>-</>
                                    )}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {t('noun.mountain')}
                                </TableCell>
                                <TableCell>{trail.Mountain}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {t('noun.start_location')}
                                </TableCell>
                                <TableCell>{trail.StartLocation}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {t('verb.maintains')}
                                </TableCell>
                                <TableCell>{trail.Maintainer}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {t('strings.related_information')}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        size="small"
                                        endIcon={<LaunchIcon />}
                                        color="primary"
                                        href={trail.RelatedInformationLink}
                                        target="_blank"
                                    >
                                        {t('noun.link')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>

            {trail.MapName ? (
                <>
                    <section>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {t('noun.elevation_graph')}
                        </Typography>

                        <Paper>
                            <img src={mapGraphUrl(trail.MapName)} alt={trail.Name} />
                        </Paper>
                    </section>
                </>
            ) : null}
        </section>
    );
}

export default withTranslation()(TrailDetails);