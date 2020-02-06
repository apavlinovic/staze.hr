import React, { useState, useEffect } from "react";
import { Grid, FormControl, Select, InputLabel, MenuItem, Box, Typography, Card, CardContent } from '@material-ui/core';
import Pagination from "material-ui-flat-pagination";
import Loader from "../global/Loader/Loader";

import TrailListItem from "./TrailListItem";
import './TrailList.scss'
import { withTranslation } from "react-i18next";
import {
    FILTER_DISTANCE, FILTER_DURATION, PAGE_SIZE, SORTS
} from "./TrailList.configuration"

const TrailList = (props) => {
    const { mountain, t } = props;
    const [ isLoading , setLoading  ]= useState(true);
    const [ trails , setTrails  ]= useState({});
    const [ offset, setOffset ] = useState(0);
    const [ orderBy, setOrderBy ] = useState(SORTS.NAME_ASC.sort);
    const [ distanceFilter, setDistanceFilter ] = useState(FILTER_DISTANCE.DISTANCE_MAX.filter);
    const [ durationFilter, setDurationFilter ] = useState(FILTER_DURATION.DURATION_MAX.filter);

    useEffect(() => {
        let q = `/api/trails?pageSize=${ PAGE_SIZE }&page=${ (offset / PAGE_SIZE) + 1 }&mountain=${mountain}&orderBy=${orderBy}&distance=${distanceFilter}&duration=${durationFilter}`

        fetch(q)
            .then(res => res.json())
            .then(res => {
                setTrails(res) 
                setLoading(false)
            })
            .catch(() => setLoading(false));
            
    }, [ mountain, offset, orderBy, distanceFilter, durationFilter ])

    useEffect(() => {
        setOffset(0)
    }, [mountain])

    const handleChange = event => {
        switch(event.target.name) {
            case "orderBy": setOrderBy(event.target.value); break;
            case "distanceFilter": setDistanceFilter(event.target.value); break;
            case "durationFilter": setDurationFilter(event.target.value); break;
        }
    };

    if(isLoading) {
        return <Loader></Loader>
    }

    return (
        <>

        <Grid container spacing={2}>
            <Grid item md={4}>
                <FormControl variant="outlined" size="small" fullWidth>
                    <InputLabel id="trail-list-sort">{t('verb.order_by')}</InputLabel>
                    <Select
                        labelId="trail-list-sort"
                        id="trail-list-sort"
                        value={orderBy}
                        name="orderBy"
                        onChange={handleChange}>
                            { Object.entries(SORTS).map((sortDescriptor, index) => {
                                let key = sortDescriptor[0];
                                let sort = sortDescriptor[1];
                                return <MenuItem key={ key } value={ sort.sort }>{t(sort.label)}</MenuItem>
                            })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={4}>
                <FormControl variant="outlined" size="small" fullWidth>
                    <InputLabel id="trail-list-filter-distance">{t('noun.distance')}</InputLabel>
                    <Select
                        labelId="trail-list-filter-distance"
                        id="trail-list-filter-distance"
                        value={distanceFilter}
                        name="distanceFilter"
                        onChange={handleChange}>
                            { Object.entries(FILTER_DISTANCE).map((filterDescriptor, index) => {
                                let key = filterDescriptor[0];
                                let filter = filterDescriptor[1];
                                return <MenuItem key={ key } value={ filter.filter }>{t(filter.label)}</MenuItem>
                            })}
                    </Select>
                </FormControl>        
            </Grid>
            <Grid item md={4}>
                <FormControl variant="outlined" size="small" fullWidth>
                    <InputLabel id="trail-list-filter-duration">{t('noun.duration')}</InputLabel>
                    <Select
                        labelId="trail-list-filter-duration"
                        id="trail-list-filter-duration"
                        value={durationFilter}
                        name="durationFilter"
                        onChange={handleChange}>
                            { Object.entries(FILTER_DURATION).map((filterDescriptor, index) => {
                                let key = filterDescriptor[0];
                                let filter = filterDescriptor[1];
                                return <MenuItem key={ key } value={ filter.filter }>{t(filter.label)}</MenuItem>
                            })}
                    </Select>
                </FormControl>        
            </Grid>            
        </Grid>

        {
            trails.count > 0 
            ? <>
                <Grid container spacing={2} className="ui--TrailList">
                {
                    trails.rows.map(trail => (
                        <Grid item key={ trail.Id } md={6} xs={12}>
                            <TrailListItem trail={ trail }>
                            </TrailListItem>
                        </Grid>
                    ))
                }
                </Grid>

                { 
                    trails.count > PAGE_SIZE
                    ? (
                        <Pagination
                            className="ui--TrailListPagination"
                            limit={ PAGE_SIZE }
                            total={ trails.count }
                            offset={ offset }
                            onClick={ (e, offset) => setOffset(offset) }
                        >
                        </Pagination>
                    ) : null
                }
            </>

            : <Box textAlign="center">
                <Card>
                    <CardContent>                        
                        { t('strings.no_results') }
                    </CardContent>
                </Card>
            </Box>
        }
        </>
    )
}

export default withTranslation()(TrailList);