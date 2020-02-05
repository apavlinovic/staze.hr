import React, { useState, useEffect } from "react";
import { Grid } from '@material-ui/core';
import Pagination from "material-ui-flat-pagination";
import Loader from "../global/Loader/Loader";

import TrailListItem from "./TrailListItem";

import './TrailList.scss'

const TrailList = (props) => {
    const { mountain } = props;
    const [ isLoading , setLoading  ]= useState(true);
    const [ trails , setTrails  ]= useState({});

    let pageSize = 50;
    const [ offset, setOffset ] = useState(0);

    useEffect(() => {
        let q = `/api/trails?pageSize=${ pageSize }&page=${ (offset / pageSize) + 1 }&mountain=${mountain}`

        fetch(q)
            .then(res => res.json())
            .then(res => {
                setTrails(res) 
                setLoading(false)
            })
            .catch(() => setLoading(false));
            
    }, [ mountain, offset ])

    useEffect(() => {
        setOffset(0)
    }, [mountain])

    if(isLoading) {
        return <Loader></Loader>
    }

    return (
        <>
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
            trails.count > pageSize
            ? (
                <Pagination
                    className="ui--TrailListPagination"
                    limit={ pageSize }
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

export default TrailList;