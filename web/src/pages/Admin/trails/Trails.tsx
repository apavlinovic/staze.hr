import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import { Query } from '../../../types';
import Table from '../../../../src/common/ui/table/Table';
import Loading from '../../../common/core/loading/Loading';
import Error from '../../../common/core/error/Error';

const TRAILS_QUERY = gql`
    query trailsQuery($offset: Int!, $pageSize: Int!) {
        trails(
            offset: $offset
            pageSize: $pageSize
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

function AdminTrails() {
    let [pageSize, setPageSize] = useState(50);
    let [pageIndex, setPageIndex] = useState(0);

    const { loading, error, data } = useQuery<Query>(TRAILS_QUERY, {
        variables: {
            offset: pageIndex * pageSize,
            pageSize,
        },
    });

    function fetchData(currentPage: number, currentPageSize: number) {
        setPageSize(currentPageSize);
        setPageIndex(currentPage);
    }

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

    return (
        <Table
            columns={columns}
            data={data?.trails?.items}
            totalRows={data?.trails?.total}
            onTableStateChange={fetchData}
        />
    );
}

export default AdminTrails;
