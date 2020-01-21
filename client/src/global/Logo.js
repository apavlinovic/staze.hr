import React from 'react';
import { withTranslation } from 'react-i18next';

import './Logo.scss';

function Logo({ t }) {
   
    return (
        <picture className="ui--Logo">
            <img src="/branding/SVG/staze-hr-logo@vector.svg" alt={t('strings.logo_description')} />
        </picture>
    );
}

export default withTranslation()(Logo);
