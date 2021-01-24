import React, { PropsWithChildren } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import './Card.scss';
import { CardLink } from '../CardUtilities';

interface CardProps {
    linkTo?: string | null;
    header?: string;
    variant?: 'default' | 'full-image';
    className?: string | null;
}

function Card(props: PropsWithChildren<CardProps & WithTranslation>) {
    const {
        children,
        variant = 'default',
        header,
        t,
        linkTo,
        className,
    } = props;

    return (
        <div className={`ui--card ${variant} ${className}`}>
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
