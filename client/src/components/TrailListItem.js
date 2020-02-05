import React from "react";
import { Card, CardContent, Link, CardMedia, CardActionArea } from '@material-ui/core';
import LocationOn from '@material-ui/icons/LocationOn';
import Schedule from '@material-ui/icons/Schedule';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';

import { mapImageUrl } from "../global/Helpers";

import "./TrailListItem.scss";

const TrailListItem = (props) => {
    const { trail, t } = props;

    return (
        <Link underline="none" component={RouterLink} to={ `/trail/${ trail.Slug }` }>
            <Card className="ui--TrailListItem">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={ trail.Name }
                        height="200"
                        image={ mapImageUrl(trail.MapName) }
                        title={ trail.Name }
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            { trail.Name }
                        </Typography>

                        <Typography variant="body1" className="information">
                            <span><LocationOn></LocationOn> { trail.StartLocation }</span>
                            { trail.Duration && trail.Duration !== "0:00" ? <span><Schedule></Schedule> { trail.Duration } h</span> : null }
                            { trail.Distance !== "0.00" ? <span><DirectionsWalk></DirectionsWalk>{ trail.Distance } km</span> : null }
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}

export default withTranslation()(TrailListItem);