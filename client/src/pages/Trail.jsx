import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import React from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import {
    Grid,
    Paper,
    Container,
    Breadcrumbs,
    Typography,
    Link,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    ListItemIcon,
} from '@material-ui/core';

import TrailDetails from '../components/TrailDetails/TrailDetails';
import Loader from '../global/Loader/Loader';
import SEO from '../global/SEO/SEO';

const TRAIL_LIST_QUERY = gql`
    query($slug: String!) {
        trail(trailSlug: $slug) {
            id
            name
            description
            type
            slug
            mountain
            maintainer
            duration
            heightDifference
            relatedInformationLink
            distance
            hasValidGpx
            gpxTraceId
            gpxTraceUrl
            mapName
            originalMapUrl
            startLocation
            startLocationCoords {
                coordinates
            }
            endLocation
            endLocationCoords {
                coordinates
            }
            modifiedOn
        }
    }
`;

function Trail() {
    let { slug } = useParams();

    const { loading, error, data } = useQuery(TRAIL_LIST_QUERY, {
        variables: {
            slug,
        },
    });

    if (loading) return <Loader></Loader>;
    if (error) return error;

    return (
        <Container>
            <SEO title={data.trail.name} description={data.trail.description} />
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <section>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                component={RouterLink}
                                color="inherit"
                                to={`/mountain/${data.trail.mountain}`}
                            >
                                {data.trail.mountain}
                            </Link>

                            <Typography color="textPrimary">
                                {data.trail.name}
                            </Typography>
                        </Breadcrumbs>
                    </section>

                    <section>
                        <Typography variant="h3" component="h1" gutterBottom>
                            {data.trail.name}
                        </Typography>
                    </section>
                </Grid>
                <Grid item md={9}>
                    <TrailDetails trail={data.trail} />
                </Grid>
                <Grid item md={3}>
                    <Paper>
                        <List>
                            <ListSubheader>Akcije</ListSubheader>

                            <ListItem>
                                <ListItemText>Ocijeni</ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemText>Preuzmi GPS trag</ListItemText>
                                <ListItemIcon></ListItemIcon>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Trail;
