import React, { PropsWithChildren } from 'react';
import './ResponsiveImage.scss';

interface ResponsiveImageProps {
    imageUrl?: string | undefined;
    imageAlt?: string | undefined;
}

function ResponsiveImage(props: PropsWithChildren<ResponsiveImageProps>) {
    const { imageUrl, imageAlt } = props;

    return (
        <div className="cropped-image">
            {imageUrl && (
                <img
                    className="reduce-contrast-on-dark-mode sepia-on-dark-mode"
                    src={imageUrl}
                    alt={imageAlt}
                />
            )}
        </div>
    );
}

export default ResponsiveImage;
