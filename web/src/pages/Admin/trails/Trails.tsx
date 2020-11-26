import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import { Query } from '../../../types';
import './Trails.scss';
import { Checkbox } from 'semantic-ui-react';

const TRAILS_QUERY = gql`
    query trailsQuery {
        trails(
            offset: 0
            pageSize: 20
            orderBy: [{ column: "id", direction: "ASC" }]
        ) {
            items {
                id
                name
                duration
                distance
                hasValidGpx
                mapName
            }

            total
        }
    }
`;

function AdminTrails(props: WithTranslation) {
    const { t } = props;
    const { data } = useQuery<Query>(TRAILS_QUERY);

    return (
        <div className="admin-trails">
            <h1 className="trails-header">Trails</h1>

            <div
                className="grid"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {data?.trails?.items.map((trail, index) => (
                    <div className="grid-box">
                        <div className="grid-item trail-id">{trail.id}</div>
                        <div className="grid-item trail-name">{trail.name}</div>
                        <div className="grid-item trail-duration">
                            {trail.duration}
                        </div>
                        <div className="grid-item trail-distance">
                            {trail.distance}
                        </div>
                        <div className="grid-item trail-hasValidGpx">
                            {trail.hasValidGpx}
                        </div>
                        <div className="grid-item trail-mapName">
                            {trail.mapName}
                        </div>
                        <div className="grid-item trail-actions">
                            <Checkbox />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default withTranslation()(AdminTrails);
