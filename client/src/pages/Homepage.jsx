import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import {
    Grid,
    Link,
    Card,
    CardActionArea,
    Typography,
    Container,
    CardContent,
} from '@material-ui/core';

import Loader from '../global/Loader/Loader';
import SEO from '../global/SEO/SEO';

const MOUNTAINS_QUERY = gql`
    query {
        mountains {
            name
            trails
        }
    }
`;

function Homepage(props) {
    const { loading, error, data } = useQuery(MOUNTAINS_QUERY);

    if (loading) return <Loader></Loader>;
    if (error) return 'Error!';

    return (
        <Container>
            <SEO title="Homepage" />
            <Grid container spacing={2}>
                {data.mountains.map((mountain) => (
                    <Grid item md={3} xs={12}>
                        <Link
                            underline="none"
                            component={RouterLink}
                            to={`/mountain/${mountain.name}`}
                        >
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {mountain.name}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                        >
                                            {mountain.trails}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default withTranslation()(Homepage);
