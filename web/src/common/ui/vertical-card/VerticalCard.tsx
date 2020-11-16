import React, { PropsWithChildren, ReactNode } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './VerticalCard.scss';

interface VerticalCardProps {
    linkTo?: string;
    header?: string;
    imageUrl?: string;
}

function VerticalCard(
    props: PropsWithChildren<VerticalCardProps & WithTranslation>,
) {
    const { children, header, t, imageUrl: imageUrl } = props;

    return (
        <div className={`ui--verticalcard`}>
            <div className="content">
                {header && <h2>{t(header)}</h2>}
                {imageUrl && <img src={imageUrl} alt={header} />}
                {children}
            </div>
        </div>
    );
}

export default withTranslation()(VerticalCard);
