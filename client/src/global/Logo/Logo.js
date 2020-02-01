import React from 'react';
import { withTranslation } from 'react-i18next';

import './Logo.scss';

function Logo({ t }) {
   
    return (
        <a href="#" className="ui--Logo">
            <picture>
                <img src="/branding/SVG/staze-logo@vector.svg" alt={t('strings.logo_description')} />
            </picture>
        </a>
    );
}

export default withTranslation()(Logo);
