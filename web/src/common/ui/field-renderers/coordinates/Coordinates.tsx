import { GeoPoint } from '../../../../types';

interface CoordinatesProps {
    geopoint: GeoPoint | null | undefined;
    decimals?: number | null | undefined;
    title?: string | null | undefined;
    linksToGoogleMaps?: boolean;
}

const DEFAULT_DECIMALS = 3;
const GOOGLE_MAPS_URL_BASE = 'http://www.google.com/maps/place';

function Coordinates(props: CoordinatesProps) {
    const {
        geopoint,
        decimals = DEFAULT_DECIMALS,
        linksToGoogleMaps = true,
        title,
    } = props;

    const asTextCoordinates = (coords: number[]) => {
        const [lat, long] = coords;
        return `${lat.toFixed(decimals || DEFAULT_DECIMALS)}, ${long.toFixed(
            decimals || DEFAULT_DECIMALS,
        )}`;
    };

    const asOutboundMapsLink = (coords: number[]) => {
        const [lat, long] = coords;

        return (
            <a
                href={`${GOOGLE_MAPS_URL_BASE}/${lat},${long}`}
                target="_blank"
                rel="noreferrer"
            >
                {title || asTextCoordinates([lat, long])}
            </a>
        );
    };

    const renderCoordinatesLink = () => {
        if (!geopoint) {
            return null;
        }

        const { coordinates } = geopoint;

        if (!coordinates || coordinates.length === 0) {
            return null;
        }

        if (linksToGoogleMaps) {
            return asOutboundMapsLink(coordinates);
        }

        return asTextCoordinates(coordinates);
    };

    return (
        <span className="ui-height-difference">
            <span>{renderCoordinatesLink()}</span>
        </span>
    );
}

export default Coordinates;
