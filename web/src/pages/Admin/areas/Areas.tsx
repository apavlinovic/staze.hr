import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import { Area, Query } from '../../../types';
import Table from '../../../common/ui/table/Table';
import { UseTableCellProps } from 'react-table';
import Loading from '../../../common/core/loading/Loading';
import Error from '../../../common/core/error/Error';

import './Areas.scss';

const AREAS_QUERY = gql`
    query areasQuery($offset: Int!, $pageSize: Int!) {
        areas(
            offset: $offset
            pageSize: $pageSize
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

function AdminTrails() {
    const { loading, error, data } = useQuery<Query>(AREAS_QUERY, {
        variables: {
            offset: 0,
            pageSize: 20,
        },
    });

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
            width: 1000,
        },
        {
            Header: 'Name',
            accessor: 'name',
            width: 200,
            Cell: (cell: UseTableCellProps<Area>) => {
                return (
                    <Link to={`/admin/areas/edit/${cell.row.original.id}`}>
                        {cell.row.original.name}
                    </Link>
                );
            },
        },

        {
            Header: 'Slug',
            accessor: 'slug',
        },
        {
            Header: 'Actions',
            Cell: (cell: UseTableCellProps<Area>) => {
                return (
                    <Link to={`/admin/areas/edit/${cell.row.original.id}`}>
                        Edit
                    </Link>
                );
            },
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                data={data?.areas?.items}
                totalRows={data?.areas?.total}
                onTableStateChange={() => {}}
            />
        </div>
    );
}

export default AdminTrails;
