import React, { PropsWithChildren, ReactNode, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const CardLink: React.FC<{ linkTo: string | null | undefined }> = ({
    linkTo,
    children,
}) => {
    if (linkTo) {
        const isOutboundLink =
            linkTo.startsWith('http//') || linkTo.startsWith('https//');

        if (isOutboundLink) {
            return (
                <a href={linkTo} target="_blank" rel="noreferrer">
                    {children}
                </a>
            );
        }

        return <NavLink to={linkTo}>{children}</NavLink>;
    }

    return <Fragment>{children}</Fragment>;
};

export { CardLink };
