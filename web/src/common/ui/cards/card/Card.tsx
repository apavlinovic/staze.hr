import React, { PropsWithChildren } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './Card.scss';
import { Link } from '../CardUtilities';

interface CardProps {
    linkTo?: string | null;
    header?: string;
    variant?: 'default' | 'full-image';
}

function Card(props: PropsWithChildren<CardProps & WithTranslation>) {
    const { children, variant = 'default', header, t, linkTo } = props;

    return (
        <div className={`ui--card ${variant}`}>
            <Link linkTo={linkTo}>
                <div className="content">
                    {header && <h2>{t(header)}</h2>}
                    {children}
                </div>
            </Link>
        </div>
    );
}

export default withTranslation()(Card);
