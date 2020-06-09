import React from 'react';
import {
    Card,
    CardContent,
    Link,
    CardMedia,
    CardActionArea,
} from '@material-ui/core';
import LocationOn from '@material-ui/icons/LocationOn';
import Schedule from '@material-ui/icons/Schedule';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';

import { mapImageUrl } from '../../global/Helpers';

import './TrailListItem.scss';

const TrailListItem = (props) => {
    const { trail, t } = props;

    return (
        <Link
            underline="none"
            component={RouterLink}
            to={`/trail/${trail.slug}`}
        >
            <Card className="ui--TrailListItem">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={trail.name}
                        height="200"
                        image={mapImageUrl(trail.mapName)}
                        title={trail.name}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {trail.name}
                        </Typography>

                        <Typography variant="body1" className="information">
                            <span>
                                <LocationOn></LocationOn> {trail.startLocation}
                            </span>
                            {trail.duration && trail.duration !== '0:00' ? (
                                <span>
                                    <Schedule></Schedule> {trail.duration}h
                                </span>
                            ) : null}
                            {trail.distance !== '0.00' ? (
                                <span>
                                    <DirectionsWalk></DirectionsWalk>
                                    {trail.distance} km
                                </span>
                            ) : null}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
};

export default withTranslation()(TrailListItem);
