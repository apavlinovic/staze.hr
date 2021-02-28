import { useEffect, useRef } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import L, { LeafletEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
    centerLat?: number | undefined;
    centerLong?: number | undefined;
    trails: Array<TrailDescriptor>;
}

interface TrailDescriptor {
    lat: number | undefined;
    long: number | undefined;
    url: string;
    name: string;
    trace: L.LatLngExpression[][] | null | undefined;
}

const ZOOM_LEVEL_DEFAULT = 12;
const LAT_LONG_DEFAULT = 0;

function calculateMapCenter(
    pins?: Array<TrailDescriptor>,
    centerLat?: number,
    centerLong?: number,
) {
    if (pins && pins.length > 0) {
        return asLatLngBounds(pins).getCenter();
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

function asLatLngBounds(pins: Array<TrailDescriptor>) {
    return new L.LatLngBounds(
        pins.map((p) => [p.lat as number, p.long as number]),
    );
}

function asMapMarker(
    trail: TrailDescriptor,
    onClick: (e: LeafletEvent) => void,
) {
    const defaultMarker =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=';
    const defaultMarkerShadow =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC';

    const marker = L.marker([trail.lat as number, trail.long as number], {
        title: trail.name,
        icon: new L.Icon({
            iconUrl: defaultMarker,
            iconAnchor: [12, 41],
            shadowUrl: defaultMarkerShadow,
        }),
    })
        .bindTooltip(trail.name)
        .on('click', onClick);

    return marker;
}

function asTrailLine(pin: TrailDescriptor, onClick: (e: LeafletEvent) => void) {
    const TRAIL_LINE_STYLE: L.PolylineOptions = {
        weight: 4,
        opacity: 0.5,
    };

    const TRAIL_LINE_STYLE_HOVER: L.PolylineOptions = {
        opacity: 1,
        weight: 6,
    };

    const marker = L.polyline(
        pin.trace as L.LatLngExpression[][],
        TRAIL_LINE_STYLE,
    )
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

    return marker;
}

function getTileProvider() {
    return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });
}

function Map(props: MapProps & WithTranslation) {
    const $map = useRef<HTMLDivElement>(null);
    const { centerLat, centerLong, trails } = props;
    const history = useHistory();

    useEffect(() => {
        // Builds a map instance
        const map = L.map($map.current as HTMLDivElement, {
            center: calculateMapCenter(trails, centerLat, centerLong),
            zoom: ZOOM_LEVEL_DEFAULT,
        });
        // Try to display all trails inside a bounded view
        map.fitBounds(asLatLngBounds(trails));
        // Set tiles provider
        getTileProvider().addTo(map);
        // Add trails to the map
        trails.forEach((trail) => {
            const t = asMapMarker(trail, () => {
                history.push(`/trail/${trail.url}`);
            }).addTo(map);

            if (trail.trace) {
                const tl = asTrailLine(trail, () => {
                    history.push(`/trail/${trail.url}`);
                }).addTo(map);
            }
        });
    }, [centerLong, centerLat, trails]);

    return <div id="map" ref={$map}></div>;
}

export default withTranslation()(Map);
