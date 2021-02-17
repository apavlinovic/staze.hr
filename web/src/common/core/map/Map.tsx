import React from 'react';

import './Map.scss';
import { GeoPoint } from '../../../types';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface MapProps {
    center?: GeoPoint | null | undefined;
    zoom: number;
    scrollWheelZoom: boolean;
    pins?: Array<GeoPoint | null | undefined>;
}

function renderPins(pins: Array<GeoPoint | null | undefined>) {
    return pins.map((pin) => {
        if (!pin) {
            return <div />;
        }
        const [lat, lon] = pin?.coordinates;
        return (
            <Marker position={[lat, lon]}>
                <Popup>
                    Jebo ti tvoj GraphQLi React <br />~ Bruno B.
                </Popup>
            </Marker>
        );
    });
}

function Map(props: MapProps) {
    if (!props.center?.coordinates) {
        return <div></div>;
    }

    const [centerLat, centerLon] = props.center.coordinates;

    return (
        <MapContainer
            className="MapContainer"
            center={[centerLat, centerLon]}
            zoom={props.zoom}
            scrollWheelZoom={props.scrollWheelZoom}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {renderPins(props.pins || [])}
        </MapContainer>
    );
}

export default Map;
