import React, { PropsWithChildren, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './Card.scss';

interface CardProps {
    linkTo?: string;
    isAbsoluteLink?: boolean;
    variant?: 'default' | 'edge-to-edge-image';
}

function Card(props: PropsWithChildren<CardProps>) {
    const {
        children,
        linkTo,
        isAbsoluteLink = false,
        variant = 'default',
    } = props;

    const withLink = (el: ReactNode) => {
        if (linkTo && isAbsoluteLink)
            return (
                <a href={linkTo} target="_blank">
                    {el}
                </a>
            );
        if (linkTo) return <NavLink to={linkTo}>{el}</NavLink>;

        return el;
    };

    return (
        <div className={`ui--card ${variant}`}>
            {withLink(<div className="content">{children}</div>)}
        </div>
    );
}

export default Card;
