import React from 'react';
import { GeoPoint } from '../../../types';

interface CoordinatesProps {
    geopoint: GeoPoint | null | undefined;
    decimals?: number;
    linksToGoogleMaps?: boolean;
}

const GOOGLE_MAPS_URL_BASE = 'http://www.google.com/maps/place';

function Coordinates(props: CoordinatesProps) {
    const { geopoint, decimals = 3, linksToGoogleMaps = true } = props;

    const asTextCoordinates = (coords: number[]) => {
        const [lat, long] = coords;
        return `${lat.toFixed(decimals)}, ${long.toFixed(decimals)}`;
    };

    const asOutboundMapsLink = (coords: number[]) => {
        const [lat, long] = coords;

        return (
            <a href={`${GOOGLE_MAPS_URL_BASE}/${lat},${long}`} target="_blank">
                {asTextCoordinates([lat, long])}
            </a>
        );
    };

    const getRenderableHeightDifference = () => {
        if (!geopoint) {
            return null;
        }

        const { coordinates } = geopoint;

        if (!coordinates || coordinates.length == 0) {
            return null;
        }

        if (linksToGoogleMaps) {
            return asOutboundMapsLink(coordinates);
        }

        return asTextCoordinates(coordinates);
    };

    return (
        <span className="ui-height-difference">
            <span>{getRenderableHeightDifference()}</span>
        </span>
    );
}

export default Coordinates;
