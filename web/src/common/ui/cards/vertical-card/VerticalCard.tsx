import React, { PropsWithChildren } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import './VerticalCard.scss';
import ResponsiveImage from '../responsive-image/ResponsiveImage';
import { CardLink } from '../CardUtilities';

interface VerticalCardProps {
    linkTo?: string;
    header?: string;
    imageUrl?: string;
}

function VerticalCard(
    props: PropsWithChildren<VerticalCardProps & WithTranslation>,
) {
    const { children, header, t, imageUrl: imageUrl, linkTo } = props;

    return (
        <div className={`ui--verticalcard`}>
            <CardLink linkTo={linkTo}>
                <div className="content">
                    {header && <h2>{t(header)}</h2>}
                    {imageUrl && <ResponsiveImage imageUrl={imageUrl} />}
                    {children}
                </div>
            </CardLink>
        </div>
    );
}

export default withTranslation()(VerticalCard);
