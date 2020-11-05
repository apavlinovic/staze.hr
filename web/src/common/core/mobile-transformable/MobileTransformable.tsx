import React, { ReactNode, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import './MobileTransformable.scss';
import { ReactComponent as CloseIcon } from './CloseIcon.svg';

interface MobileTransformableProps extends WithTranslation {
    openerIcon: ReactNode | string;
    headerTitle: string;
    content: (setDrawerOpen: (status: boolean) => void) => ReactNode;
}

function MobileTransformable(props: MobileTransformableProps) {
    const { headerTitle, openerIcon, t, content } = props;
    const [isDrawerOpen, setDrawerOpenStatus] = useState(false);

    return (
        <section
            className={`mobile__transformable ${
                isDrawerOpen ? '__visible' : undefined
            }`}
        >
            <button
                onClick={() => setDrawerOpenStatus(!isDrawerOpen)}
                className="mobile__menu-toggle"
            >
                {openerIcon}
            </button>

            <section className="wrap mobile__wrap">
                <header className="mobile__controls">
                    <h2>{t(headerTitle)}</h2>
                    <button onClick={() => setDrawerOpenStatus(!isDrawerOpen)}>
                        <CloseIcon />
                    </button>
                </header>
                <section className="content mobile__content">
                    {content(setDrawerOpenStatus)}
                </section>
            </section>
        </section>
    );
}

export default withTranslation()(MobileTransformable);
