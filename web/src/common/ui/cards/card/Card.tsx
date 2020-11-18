import React, { PropsWithChildren } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import './Card.scss';
import { CardLink } from '../CardUtilities';

interface CardProps {
    linkTo?: string | null;
    header?: string;
    variant?: 'default' | 'full-image';
}

function Card(props: PropsWithChildren<CardProps & WithTranslation>) {
    const { children, variant = 'default', header, t, linkTo } = props;

    return (
        <div className={`ui--card ${variant}`}>
            <CardLink linkTo={linkTo}>
                <div className="content">
                    {header && <h2>{t(header)}</h2>}
                    {children}
                </div>
            </CardLink>
        </div>
    );
}

export default withTranslation()(Card);
