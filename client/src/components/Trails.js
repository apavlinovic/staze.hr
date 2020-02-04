import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid } from '@material-ui/core';
import Pagination from "material-ui-flat-pagination";

import Loader from "../global/Loader/Loader";
import { Link } from "react-router-dom";

import { prettyPrintCoordinates, renderNavigateToCoordinatesLink } from "../global/Helpers";

const Trails = (props) => {
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
        <h2>{ mountain }</h2>
        <Grid container spacing={2}>
        {
            trails.rows.map(trail => {
                return (
                    <Grid item key={ trail.Id } md={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Link to={ `/trail/${ trail.Slug }` }>
                                    <h3>{ trail.Name }</h3>
                                </Link>
                                { trail.Duration }h | { trail.Distance }km |
                                { trail.StartLocation } 
                                <a target="_blank" href={ renderNavigateToCoordinatesLink(trail.StartLocationCoords) }>
                                    { trail.StartLocationCoords.coordinates[1] }, { trail.StartLocationCoords.coordinates[0] }
                                </a>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })
        }
        </Grid>

        { 
            trails.count > pageSize
            ? (
                <Pagination
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

export default Trails;