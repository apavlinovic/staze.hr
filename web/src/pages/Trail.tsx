import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import Loading from '../common/core/loading/Loading';
import Error from '../common/core/error/Error';
import { Query, QueryTrailArgs } from '../types';
import { useParams } from 'react-router-dom';

const TRAIL_QUERY = gql`
    query getTrail($trailSlug: String!) {
        trail(trailSlug: $trailSlug) {
            id
            type
            name
            description
            slug
            area {
                slug
                name
            }
            mapName
            duration
            distance
            maintainer
            heightDifference
            relatedInformationLink
            originalMapUrl
            startLocation
            startLocationCoords {
                coordinates
            }
            endLocation
            endLocationCoords {
                coordinates
            }
        }
    }
`;

function Trail(props: WithTranslation) {
    const { t } = props;
    const { slug } = useParams<{
        slug: string;
    }>();

    const { loading, error, data } = useQuery<Query, QueryTrailArgs>(
        TRAIL_QUERY,
        {
            variables: {
                trailSlug: slug,
            },
        },
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        console.warn(error);
        return <Error error={error} />;
    }

    return (
        <main>
            <h1>{data?.trail?.name}</h1>
            <p>{data?.trail?.description}</p>
            <img src={`/trails/map/${data?.trail?.mapName}`} alt={data?.trail?.name} />
            <img src={`/trails/elevation/${data?.trail?.mapName}`} alt={data?.trail?.name} />

        </main>
    );
}

export default withTranslation()(Trail);
