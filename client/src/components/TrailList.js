import React, { useState, useEffect } from "react";
import { Grid, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import Pagination from "material-ui-flat-pagination";
import Loader from "../global/Loader/Loader";

import TrailListItem from "./TrailListItem";
import './TrailList.scss'
import { withTranslation } from "react-i18next";

const PAGE_SIZE = 50;

const SORTS = {
    NAME_ASC: { sort: 'Name-asc', label: 'strings.orderby_name_asc' },
    NAME_DESC: { sort: 'Name-desc', label: 'strings.orderby_name_desc' },
    DURATION_ASC: { sort: 'Duration-asc', label: 'strings.orderby_duration_asc' },
    DURATION_DESC: { sort: 'Duration-desc', label: 'strings.orderby_duration_desc' },
    DISTANCE_ASC: { sort: 'Distance-asc', label: 'strings.orderby_distance_asc' },
    DISTANCE_DESC: { sort: 'Distance-desc', label: 'strings.orderby_distance_desc' },
}

const TrailList = (props) => {
    const { mountain, t } = props;
    const [ isLoading , setLoading  ]= useState(true);
    const [ trails , setTrails  ]= useState({});
    const [ offset, setOffset ] = useState(0);
    const [ orderBy, setOrderBy ] = useState(SORTS.NAME_ASC.sort);


    useEffect(() => {
        let q = `/api/trails?pageSize=${ PAGE_SIZE }&page=${ (offset / PAGE_SIZE) + 1 }&mountain=${mountain}&orderBy=${orderBy}`

        fetch(q)
            .then(res => res.json())
            .then(res => {
                setTrails(res) 
                setLoading(false)
            })
            .catch(() => setLoading(false));
            
    }, [ mountain, offset, orderBy ])

    useEffect(() => {
        setOffset(0)
    }, [mountain])

    const handleChange = event => {
        setOrderBy(event.target.value);
    };

    if(isLoading) {
        return <Loader></Loader>
    }

    return (
        <>

        <FormControl variant="outlined" size="small">
            <InputLabel id="trail-list-sort">{t('verb.orderby')}</InputLabel>
            <Select
                labelId="trail-list-sort"
                id="trail-list-sort"
                value={orderBy}
                onChange={handleChange}>
                    { Object.entries(SORTS).map((sortDescriptor, index) => {
                        let sort = sortDescriptor[1];
                        return <MenuItem key={ sort.sort } value={ sort.sort }>{t(sort.label)}</MenuItem>
                    })}
            </Select>
        </FormControl>

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
    )
}

export default withTranslation()(TrailList);