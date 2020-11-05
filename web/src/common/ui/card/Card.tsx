import React, { PropsWithChildren, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './Card.scss';

interface CardProps {
    linkTo?: string;
    image?: ReactNode;
}

function Card(props: PropsWithChildren<CardProps>) {
    const { children, linkTo, image } = props;

    const withLink = (el: ReactNode) => {
        if (linkTo) return <NavLink to={linkTo}>{el}</NavLink>;

        return el;
    };

    return (
        <div className="ui--card">
            {withLink(<div className="content">{children}</div>)}
        </div>
    );
}

export default Card;
