import React from 'react';

interface DistanceProps {
    distance: number | null | undefined;
}

function Distance(props: DistanceProps) {
    const { distance } = props;

    const getRenderableDistance = () => {
        if (!distance) {
            return '?? km';
        }

        return `${distance} km`;
    };

    return <span className="ui-distance">{getRenderableDistance()}</span>;
}

export default Distance;
