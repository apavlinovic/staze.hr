import { useEffect, useRef } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import L, { LeafletEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { reduceHooks } from 'react-table';

interface MapProps {
    trails: Array<TrailDescriptor>;

    centerLat?: number;
    centerLong?: number;
}

interface TrailDescriptor {
    name: string;
    id: number;
    startCoords: number[];
    endCoords: number[];

    url?: string | null;
    distance?: number | null;
    duration?: string | null;
    trace?: L.LatLngExpression[][] | null;
}

const ZOOM_LEVEL_DEFAULT = 12;
const LAT_LONG_DEFAULT = 0;
const TRAIL_LINE_COLOR = '#888';
const TRAIL_LINE_COLOR_HOVER = 'black';
const TRAIL_CORE_COLOR = 'red';
const TRAIL_LINE_STYLE: L.PolylineOptions = {
    weight: 3,
    color: TRAIL_LINE_COLOR,
};
const TRAIL_LINE_STYLE_HOVER: L.PolylineOptions = {
    weight: 4,
    color: TRAIL_LINE_COLOR_HOVER,
};
const TRAIL_START_STYLE: L.CircleMarkerOptions = {
    color: TRAIL_CORE_COLOR,
    fillColor: 'white',
    fillOpacity: 1,
    radius: 5,
};

const TILES_PROVIDER = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
);

function calculateMapCenter(
    trails?: Array<TrailDescriptor>,
    centerLat?: number,
    centerLong?: number,
) {
    if (trails && trails.length > 0) {
        return asLatLngBounds(trails).getCenter();
    } else if (centerLat && centerLong) {
        return {
            lat: centerLat,
            lng: centerLong,
        };
    }

    return {
        lat: LAT_LONG_DEFAULT,
        lng: LAT_LONG_DEFAULT,
    };
}

function asLatLngBounds(trails: Array<TrailDescriptor>) {
    // We're calculating the Lat and Long bounds based on trail start coordinates,
    // as those are always present for trails that have GPS traces
    return new L.LatLngBounds(
        trails.map((t) => [
            t.startCoords[0] as number,
            t.startCoords[1] as number,
        ]),
    );
}

function asTrailStartMarker(
    trail: TrailDescriptor,
    onClick: (e: LeafletEvent) => void,
) {
    const marker = L.circleMarker(
        [trail.startCoords[0] as number, trail.startCoords[1] as number],
        TRAIL_START_STYLE,
    )
        .bindTooltip(trail.name)
        .on('click', onClick);

    return marker;
}

function asTrailLine(pin: TrailDescriptor, onClick: (e: LeafletEvent) => void) {
    return L.polyline(pin.trace as L.LatLngExpression[][], TRAIL_LINE_STYLE)
        .bindTooltip(pin.name)
        .on('click', onClick)
        .on('mouseover', function (e) {
            var layer = e.target;
            layer.setStyle(TRAIL_LINE_STYLE_HOVER);
        })
        .on('mouseout', function (e) {
            var layer = e.target;
            layer.setStyle(TRAIL_LINE_STYLE);
        });
}

function Map(props: MapProps & WithTranslation) {
    const { centerLat, centerLong, trails } = props;
    const history = useHistory();
    let map: L.Map | null = null;

    useEffect(() => {
        // Builds a map instance
        map = L.map('map', {
            center: calculateMapCenter(trails, centerLat, centerLong),
            zoom: ZOOM_LEVEL_DEFAULT,
        });
        // Set tiles provider
        TILES_PROVIDER.addTo(map);
    }, []);

    useEffect(() => {
        if (map !== null) {
            // Try to display all trails inside a bounded view
            map.fitBounds(asLatLngBounds(trails));
            // Add trails to the map
            trails.forEach((trail) => {
                if (trail.trace) {
                    const tl = asTrailLine(trail, () => {
                        history.push(`/trail/${trail.url}`);
                    }).addTo(map as L.Map);
                }
            });

            trails.forEach((trail) => {
                const t = asTrailStartMarker(trail, () => {
                    history.push(`/trail/${trail.url}`);
                }).addTo(map as L.Map);
            });
        }
    }, [trails]);

    return <div id="map"></div>;
}

export default withTranslation()(Map);
