import React, { PropsWithChildren, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './Card.scss';

interface CardProps {
    linkTo?: string;
    variant?: 'default' | 'edge-to-edge-image' | 'tile-like';
}

function Card(props: PropsWithChildren<CardProps>) {
    const { children, linkTo, variant = 'default' } = props;

    const withLink = (el: ReactNode) => {
        if (linkTo) {
            const isOutboundLink =
                linkTo.startsWith('http//') || linkTo.startsWith('https//');

            if (isOutboundLink) {
                return (
                    <a href={linkTo} target="_blank" rel="noreferrer">
                        {el}
                    </a>
                );
            }

            return <NavLink to={linkTo}>{el}</NavLink>;
        }

        return el;
    };

    return (
        <div className={`ui--card ${variant}`}>
            {withLink(<div className="content">{children}</div>)}
        </div>
    );
}

export default Card;
