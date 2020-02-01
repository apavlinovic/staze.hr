import React, { useState, useEffect } from "react";
import { ListItem, List, Chip } from '@material-ui/core';
import { Link } from "react-router-dom";

function MountainsMenu() {
    const [ isLoading, setLoading ] = useState(true);
    const [ mountains, setMountains ] = useState([]);

    useEffect(() => {
        fetch(`/api/mountains`)
            .then(res => res.json())
            .then((results) => {
                setMountains(results)
                setLoading(false)
            })
    }, [ true ]);

    if(isLoading)
        return "Loading"

    return (
            <List>
            {
                mountains.map(mountain => {
                    return (
                        <Link to={ `/mountain/${ mountain.Mountain }` } key={ mountain.Mountain}> 
                            <ListItem button>
                                { mountain.Mountain }
                                <Chip label={ mountain.TrailCount}>
                                </Chip>
                            </ListItem>
                        </Link>
                    );
                })
            }
            </List>
    )
}

export default MountainsMenu;