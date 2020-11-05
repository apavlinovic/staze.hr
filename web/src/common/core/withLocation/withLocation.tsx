import React from 'react';

const POSITION_USE_HIGH_ACCURACY = true;
const POSITION_MAXAGE = 300000;
const POSITION_TIMEOUT = 30000;

export interface withLocationInjectedProps {
    position?: Position | null;
}

export const withLocation = <P extends object>(
    Component: React.ComponentType<P>,
) => {
    return class withLocation extends React.Component<
        P & withLocationInjectedProps
    > {
        constructor(props: P) {
            super(props);

            this.state = {
                position: null,
            };
        }

        componentDidMount() {
            if (
                !navigator.geolocation ||
                !navigator.geolocation.getCurrentPosition ||
                !navigator.geolocation.watchPosition
            ) {
                console.error(`Browser geolocation not supported`);
                return;
            }

            const getLocationOptions: PositionOptions = {
                enableHighAccuracy: POSITION_USE_HIGH_ACCURACY,
                maximumAge: POSITION_MAXAGE,
                timeout: POSITION_TIMEOUT,
            };

            const processLocation = (position: Position) => {
                this.setState({
                    position,
                });
            };

            const processLocationError = (error: PositionError) => {
                console.error(`Unable to get location. Reason: `, error);
            };

            navigator.geolocation.getCurrentPosition(
                processLocation,
                processLocationError,
                getLocationOptions,
            );

            navigator.geolocation.watchPosition(
                processLocation,
                processLocationError,
                getLocationOptions,
            );
        }

        render() {
            return (
                <Component
                    {...(this.props as P)}
                    {...(this.state as withLocationInjectedProps)}
                />
            );
        }
    };
};
