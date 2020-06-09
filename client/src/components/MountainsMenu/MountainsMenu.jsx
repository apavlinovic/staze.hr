import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
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

const MOUNTAINS_QUERY = gql`
    query {
        mountains {
            name
            trails
        }
    }
`;

function MountainsMenu(props) {
    const { t } = props;
    const { loading, error, data } = useQuery(MOUNTAINS_QUERY);

    if (loading) return 'Loading';
    if (error) return 'Error!';

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
                {data.mountains.map((mountain) => {
                    return (
                        <ListItem
                            button
                            component={RouterLink}
                            to={`/mountain/${mountain.name}`}
                            key={mountain.name}
                        >
                            <ListItemText primary={mountain.name} />
                            <Chip label={mountain.trails}></Chip>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}

export default withTranslation()(MountainsMenu);
