import React from 'react';

interface HeightDifferenceProps {
    difference: string | null | undefined;
}

function HeightDifference(props: HeightDifferenceProps) {
    const { difference } = props;

    const getRenderableHeightDifference = () => {
        if (!difference) {
            return '?? m';
        }

        return `${difference} m`;
    };

    return (
        <span className="ui-height-difference">
            {getRenderableHeightDifference()}
        </span>
    );
}

export default HeightDifference;
