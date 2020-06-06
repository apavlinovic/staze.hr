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
        trailWithSlug(trailSlug: $slug) {
            Id
            Name
            Description
            Type
            Slug
            Mountain
            Maintainer
            Duration
            HeightDifference
            RelatedInformationLink
            Distance
            HasValidGpx
            GpxTraceId
            GpxTraceUrl
            MapName
            OriginalMapUrl
            StartLocation
            StartLocationCoords {
                coordinates
            }
            EndLocation
            EndLocationCoords {
                coordinates
            }
            ModifiedOn
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

    const trail = data.trailWithSlug;

    return (
        <Container>
            <SEO title={trail.Name} description={trail.Description} />
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <section>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                component={RouterLink}
                                color="inherit"
                                to={`/mountain/${trail.Mountain}`}
                            >
                                {trail.Mountain}
                            </Link>

                            <Typography color="textPrimary">
                                {trail.Name}
                            </Typography>
                        </Breadcrumbs>
                    </section>

                    <section>
                        <Typography variant="h3" component="h1" gutterBottom>
                            {trail.Name}
                        </Typography>
                    </section>
                </Grid>
                <Grid item md={9}>
                    <TrailDetails trail={trail} />
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
