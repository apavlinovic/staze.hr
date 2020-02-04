export function mapImageUrl(mapName) {
    return `/maps/${mapName}`
}

export function prettyPrintCoordinates(coordinates) {
    return coordinates.toString().substring(0,8) 
}

export function renderNavigateToCoordinatesLink(coordinates) {
    return `https://www.google.com/maps/dir/?api=1&destination=${ coordinates.coordinates[1] },${ coordinates.coordinates[0] }`;
}