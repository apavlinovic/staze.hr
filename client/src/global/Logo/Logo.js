import React from 'react';
import { withTranslation } from 'react-i18next';

import './Logo.scss';
import { Link } from 'react-router-dom';

function Logo({ t }) {
   
    return (
        <Link className="ui--Logo" to="/">
            <picture>
                <img src="/branding/SVG/staze-logo@vector.svg" alt={t('strings.logo_description')} />
            </picture>
        </Link>
    );
}

export default withTranslation()(Logo);
