import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import React, { useState } from 'react';
import {
    Grid,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Box,
    Card,
    CardContent,
} from '@material-ui/core';
import Pagination from 'material-ui-flat-pagination';
import { withTranslation } from 'react-i18next';

import Loader from '../../global/Loader/Loader';
import TrailListItem from '../TrailListItem/TrailListItem';
import './TrailList.scss';
import {
    FILTER_DISTANCE,
    FILTER_DURATION,
    PAGE_SIZE,
    SORTS,
} from './TrailList.configuration';

const TRAIL_LIST_QUERY = gql`
    query(
        $pageSize: Int!
        $offset: Int!
        $orderBy: [OrderBy!] = [{ column: "id", direction: "ASC" }]
        $mountain: String
        $maintainer: String
        $distance: Int
        $duration: String
    ) {
        trails(
            pageSize: $pageSize
            offset: $offset
            orderBy: $orderBy
            mountain: $mountain
            maintainer: $maintainer
            distance: $distance
            duration: $duration
        ) {
            items {
                name
                slug
                mapName
                startLocation
                duration
                distance
            }
            total
        }
    }
`;

const TrailList = (props) => {
    const { mountain, t } = props;
    const [offset, setOffset] = useState(0);
    const [orderBy, setOrderBy] = useState(SORTS.NAME_ASC.sort);
    const [distanceFilter, setDistanceFilter] = useState(
        FILTER_DISTANCE.DISTANCE_MAX.filter,
    );
    const [durationFilter, setDurationFilter] = useState(
        FILTER_DURATION.DURATION_MAX.filter,
    );

    const { loading, error, data } = useQuery(TRAIL_LIST_QUERY, {
        variables: {
            offset: offset,
            pageSize: PAGE_SIZE,
            orderBy: orderBy,
            mountain: mountain,
            maintainer: null,
            distance: distanceFilter,
            duration: durationFilter,
        },
    });

    if (loading) return <Loader></Loader>;
    if (error) return 'Error!';

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'orderBy':
                setOrderBy(event.target.value);
                break;
            case 'distanceFilter':
                setDistanceFilter(event.target.value);
                break;
            case 'durationFilter':
                setDurationFilter(event.target.value);
                break;
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel id="trail-list-sort">
                            {t('verb.order_by')}
                        </InputLabel>
                        <Select
                            labelId="trail-list-sort"
                            id="trail-list-sort"
                            value={orderBy}
                            name="orderBy"
                            onChange={handleChange}
                        >
                            {Object.entries(SORTS).map(
                                (sortDescriptor, index) => {
                                    let key = sortDescriptor[0];
                                    let sort = sortDescriptor[1];
                                    return (
                                        <MenuItem key={key} value={sort.sort}>
                                            {t(sort.label)}
                                        </MenuItem>
                                    );
                                },
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={4}>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel id="trail-list-filter-distance">
                            {t('noun.distance')}
                        </InputLabel>
                        <Select
                            labelId="trail-list-filter-distance"
                            id="trail-list-filter-distance"
                            value={distanceFilter}
                            name="distanceFilter"
                            onChange={handleChange}
                        >
                            {Object.entries(FILTER_DISTANCE).map(
                                (filterDescriptor, index) => {
                                    let key = filterDescriptor[0];
                                    let filter = filterDescriptor[1];
                                    return (
                                        <MenuItem
                                            key={key}
                                            value={filter.filter}
                                        >
                                            {t(filter.label)}
                                        </MenuItem>
                                    );
                                },
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={4}>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel id="trail-list-filter-duration">
                            {t('noun.duration')}
                        </InputLabel>
                        <Select
                            labelId="trail-list-filter-duration"
                            id="trail-list-filter-duration"
                            value={durationFilter}
                            name="durationFilter"
                            onChange={handleChange}
                        >
                            {Object.entries(FILTER_DURATION).map(
                                (filterDescriptor, index) => {
                                    let key = filterDescriptor[0];
                                    let filter = filterDescriptor[1];
                                    return (
                                        <MenuItem
                                            key={key}
                                            value={filter.filter}
                                        >
                                            {t(filter.label)}
                                        </MenuItem>
                                    );
                                },
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {data.trails.total > 0 ? (
                <>
                    <Grid container spacing={2} className="ui--TrailList">
                        {data.trails.items.map((trail) => (
                            <Grid item key={trail.id} md={6} xs={12}>
                                <TrailListItem trail={trail}></TrailListItem>
                            </Grid>
                        ))}
                    </Grid>

                    {data.trails.total > PAGE_SIZE ? (
                        <Pagination
                            className="ui--TrailListPagination"
                            limit={PAGE_SIZE}
                            total={data.trails.total}
                            offset={offset}
                            onClick={(e, offset) => setOffset(offset)}
                        ></Pagination>
                    ) : null}
                </>
            ) : (
                <Box textAlign="center">
                    <Card>
                        <CardContent>{t('strings.no_results')}</CardContent>
                    </Card>
                </Box>
            )}
        </>
    );
};

export default withTranslation()(TrailList);
