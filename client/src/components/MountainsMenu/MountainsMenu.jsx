import React, { useState, useEffect } from 'react';
import {
    ListItemText,
    ListSubheader,
    ListItem,
    List,
    Chip,
    Paper,
    Divider,
    ListItemIcon,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import MyLocation from '@material-ui/icons/MyLocation';

function MountainsMenu(props) {
    const { t } = props;
    const [isLoading, setLoading] = useState(true);
    const [mountains, setMountains] = useState([]);

    useEffect(() => {
        fetch(`/api/mountains?page=1&pageSize=100`)
            .then((res) => res.json())
            .then((results) => {
                setMountains(results);
                setLoading(false);
            });
    }, [true]);

    if (isLoading) return 'Loading';

    return (
        <Paper>
            <List component="nav">
                <ListSubheader>{t('noun.mountain')}</ListSubheader>

                <ListItem button component={RouterLink}>
                    <ListItemIcon>
                        <MyLocation></MyLocation>
                    </ListItemIcon>
                    <ListItemText>TODO: Nearby</ListItemText>
                </ListItem>

                <Divider />

                <ListSubheader>{t('noun.mountain')}</ListSubheader>
                {mountains.map((mountain) => {
                    return (
                        <ListItem
                            button
                            component={RouterLink}
                            to={`/mountain/${mountain.Mountain}`}
                            key={mountain.Mountain}
                        >
                            <ListItemText primary={mountain.Mountain} />
                            <Chip label={mountain.TrailCount}></Chip>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}

export default withTranslation()(MountainsMenu);
