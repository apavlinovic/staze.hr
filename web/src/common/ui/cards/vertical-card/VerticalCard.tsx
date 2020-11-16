import React, { PropsWithChildren, ReactNode } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import './VerticalCard.scss';
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
                    {imageUrl && <img src={imageUrl} alt={header} />}
                    {children}
                </div>
            </CardLink>
        </div>
    );
}

export default withTranslation()(VerticalCard);
