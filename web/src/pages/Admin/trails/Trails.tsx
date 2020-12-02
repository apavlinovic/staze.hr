import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import { Query } from '../../../types';
import Table from '../../../../src/common/ui/table/Table';
import Loading from '../../../common/core/loading/Loading';
import Error from '../../../common/core/error/Error';

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
                area {
                    name
                }
            }

            total
        }
    }
`;

function AdminTrails(props: WithTranslation) {
    // const { t } = props;

    const { loading, error, data } = useQuery<Query>(TRAILS_QUERY);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Duration',
            accessor: 'duration',
        },
        {
            Header: 'Distance',
            accessor: 'distance',
        },
        {
            Header: 'Valid Gpx',
            accessor: 'hasValidGpx',
        },
        {
            Header: 'Area name',
            accessor: 'area.name',
        },
        {
            Header: 'Actions',
            accessor: 'actions',
        },
        {
            Header: 'Edit',
            accessor: 'edit',
        },
    ];

    return <Table columns={columns} data={data?.trails?.items} />;
}

export default withTranslation()(AdminTrails);
