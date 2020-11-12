import React from 'react';

interface DurationProps {
    duration: string | null | undefined;
}

function Duration(props: DurationProps) {
    const { duration } = props;

    const getRenderableDuration = () => {
        if (!duration) {
            return '?? h';
        }

        return `${duration} h`;
    };

    return <span className="ui-duration">{getRenderableDuration()}</span>;
}

export default Duration;
