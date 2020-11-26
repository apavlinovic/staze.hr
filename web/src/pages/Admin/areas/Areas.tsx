import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import { Query } from '../../../types';
import { Checkbox } from 'semantic-ui-react';

import './Areas.scss';

const AREAS_QUERY = gql`
    query areasQuery {
        areas(
            offset: 0
            pageSize: 20
            orderBy: [{ column: "id", direction: "ASC" }]
        ) {
            items {
                id
                name
                slug
                description
            }

            total
        }
    }
`;

function AdminAreas(props: WithTranslation) {
    const { t } = props;

    const { data } = useQuery<Query>(AREAS_QUERY);

    return (
        <div className="admin-areas">
            <h1>Areas</h1>

            <div
                className="grid"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {data?.areas?.items.map((area, index) => (
                    <div className="grid-box">
                        <div className="grid-item area-id">{area.id}</div>
                        <div className="grid-item area-name">{area.name}</div>
                        <div className="grid-item area-slug">{area.slug}</div>
                        <div className="grid-item area-description">
                            {area.description}
                        </div>
                        <div className="grid-item area-actions">
                            <Checkbox />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default withTranslation()(AdminAreas);
