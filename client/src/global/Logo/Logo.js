import React from 'react';
import { withTranslation } from 'react-i18next';

import './Logo.scss';
import { Link } from 'react-router-dom';

function Logo(props) {

    const { variant = "default", t } = props;
    const logoVariants = {
        "default": "/branding/SVG/staze-logo@vector.svg",
        "white":  "/branding/SVG/staze-logo-white@vector.svg",
    }
   
    return (
        <Link className="ui--Logo" to="/">
            <picture>
                <img src={ logoVariants[variant] } alt={t('strings.logo_description')} />
            </picture>
        </Link>
    );
}

export default withTranslation()(Logo);
