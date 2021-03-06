import React from 'react';
import './FullImageCard.scss';

import Card from '../card/Card';
import { withTranslation, WithTranslation } from 'react-i18next';

interface FullImageCardProps {
    imageUrl: string | null;
    imageAlt?: string;
    linkTo?: string | null;
    useAutoHeight?: boolean | null;
    header?: string;
}

function FullImageCard(props: FullImageCardProps & WithTranslation) {
    const {
        linkTo,
        header,
        imageUrl,
        imageAlt,
        useAutoHeight = false,
        t,
    } = props;

    const renderImage = (
        imageUrl: string | null,
        imageAlt: string | undefined,
    ) => {
        if (imageUrl) {
            return (
                <img
                    className="reduce-contrast-on-dark-mode"
                    src={imageUrl}
                    alt={imageAlt}
                />
            );
        }

        return (
            <img
                className="reduce-contrast-on-dark-mode"
                alt={t('default_image_description')}
                src={'/default-trail-image.jpg'}
            />
        );
    };

    return (
        <Card
            linkTo={linkTo}
            header={header}
            variant="full-image"
            className={useAutoHeight ? 'auto-height' : ''}
        >
            {renderImage(imageUrl, imageAlt)}
        </Card>
    );
}

export default withTranslation()(FullImageCard);
