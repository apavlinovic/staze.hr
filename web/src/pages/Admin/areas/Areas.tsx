import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import { Query } from '../../../types';
import Table from '../../../../src/common/ui/table/Table';
import Loading from '../../../common/core/loading/Loading';
import Error from '../../../common/core/error/Error';

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

function AdminTrails(props: WithTranslation) {
    // const { t } = props;

    const { loading, error, data } = useQuery<Query>(AREAS_QUERY);

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
        },
        {
            Header: 'Slug',
            accessor: 'slug',
        },
        {
            Header: 'Description',
            accessor: 'description',
        },
        {
            Header: 'Actions',
            accessor: 'actions',
        },
    ];

    return <Table columns={columns} data={data?.areas?.items} />;
}

export default withTranslation()(AdminTrails);
