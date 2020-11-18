import React, { PropsWithChildren } from 'react';
import './ResponsiveImage.scss';

interface ResponsiveImageProps {
    header?: string;
    imageUrl?: string;
}

function ResponsiveImage(props: PropsWithChildren<ResponsiveImageProps>) {
    const { header, imageUrl: imageUrl } = props;

    return (
        <div className="cropped-image">
            {imageUrl && <img src={imageUrl} alt={header} />}
        </div>
    );
}

export default ResponsiveImage;
