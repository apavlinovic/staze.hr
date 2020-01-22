import React from 'react';
import { withTranslation } from 'react-i18next';

import './Logo.scss';

function Logo({ t }) {
   
    return (
        <a href="#" className="ui--Logo">
            <picture>
                <source srcset="/branding/SVG/staze-logo-white@vector.svg" media="(prefers-color-scheme: dark)">
                </source>
                <img src="/branding/SVG/staze-logo@vector.svg" alt={t('strings.logo_description')} />
            </picture>
        </a>
    );
}

export default withTranslation()(Logo);
