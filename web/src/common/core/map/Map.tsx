import { useEffect, useRef } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import L, { LeafletEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
    if (hasAnyRenderableTrails(trails)) {
        return asLatLngBounds(trails as TrailDescriptor[]).getCenter();
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
    var startCoords = trails.map((t) => [
        t.startCoords[0] as number,
        t.startCoords[1] as number,
    ]);

    var endCoords = trails
        .filter((t) => t.endCoords !== null)
        .map((t) => [t.endCoords[0] as number, t.endCoords[1] as number]);

    return new L.LatLngBounds([
        ...startCoords,
        ...endCoords,
    ] as L.LatLngBoundsLiteral);
}

function asTrailTooltip(trail: TrailDescriptor) {
    const tooltip = [
        '<span>',
        `<strong>${trail.name}</strong>`,
        `<div class="metainfo">`,
        trail.distance ? `<span>${trail.distance}km</span>` : null,
        trail.duration ? `<span>${trail.duration}h</span>` : null,
        `</div>`,
        '</span>',
    ];

    return tooltip.filter((t) => t !== null).join('');
}

function asTrailStartMarker(trail: TrailDescriptor) {
    return L.circleMarker(
        [trail.startCoords[0] as number, trail.startCoords[1] as number],
        TRAIL_START_STYLE,
    );
}

function asTrailLine(trail: TrailDescriptor) {
    return L.polyline(trail.trace as L.LatLngExpression[][], TRAIL_LINE_STYLE);
}

function asTrailWithTraceGroup(
    trail: TrailDescriptor,
    onClick: (e: LeafletEvent) => void,
) {
    const features: Array<L.CircleMarker | L.Polyline> = [];
    const hasTrace = trail.trace !== null && trail.trace !== undefined;

    features.push(asTrailStartMarker(trail));

    if (hasTrace) {
        features.unshift(asTrailLine(trail));
    }

    return L.featureGroup(features)
        .bindTooltip(asTrailTooltip(trail), {
            sticky: true,
        })
        .on('mouseover', function (e) {
            if (hasTrace) {
                features[0].setStyle(TRAIL_LINE_STYLE_HOVER);
            }
        })
        .on('mouseout', function (e) {
            if (hasTrace) {
                features[0].setStyle(TRAIL_LINE_STYLE);
            }
        })
        .on('click', onClick);
}

function hasAnyRenderableTrails(trails?: Array<TrailDescriptor>) {
    return (
        trails &&
        trails.length &&
        trails.filter((trail) => !!trail.startCoords && !!trail.endCoords)
            .length > 0
    );
}

function Map(props: MapProps & WithTranslation) {
    const { centerLat, centerLong, trails, t } = props;
    const history = useHistory();
    let mapReference = useRef<L.Map | null>(null);

    useEffect(() => {
        // Builds a map instance
        mapReference.current = L.map('map', {
            center: calculateMapCenter(trails, centerLat, centerLong),
            zoom: ZOOM_LEVEL_DEFAULT,
        });

        TILES_PROVIDER.addTo(mapReference.current);

        return () => {
            if (mapReference.current && mapReference.current.remove) {
                mapReference.current.off();
                mapReference.current.remove();
            }
        };
    }, [trails]);

    useEffect(() => {
        if (mapReference.current !== null) {
            if (hasAnyRenderableTrails(trails)) {
                // Try to display all trails inside a bounded view
                mapReference.current.fitBounds(asLatLngBounds(trails));

                // Add trails to the map
                trails.forEach((trail) => {
                    asTrailWithTraceGroup(trail, () => {
                        history.push(`/trail/${trail.url}`);
                    }).addTo(mapReference.current as L.Map);
                });
            }
        }
    }, [trails]);

    return <div id="map"></div>;
}

export default withTranslation()(Map);
