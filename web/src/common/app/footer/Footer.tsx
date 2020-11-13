import React from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

import './Footer.scss';
import Logo from './../../core/logo/Logo';
import LanguageSwitcher from './../../core/language-switcher/LanguageSwitcher';
import {
    withLocation,
    withLocationInjectedProps,
} from '../../core/with-location/withLocation';

function Footer(props: WithTranslation & withLocationInjectedProps) {
    const { t, position } = props;

    return (
        <header className="common-footer">
            <div className="item">
                <NavLink to="/" className="homepage-link">
                    <Logo variant="full" />
                </NavLink>
            </div>
            <div className="item">
                <LanguageSwitcher />
            </div>
            <div className="item">
                <small>{t('strings.copyright')}</small>
            </div>
            {position && (
                <div className="item">
                    <small>
                        {t('strings.your_location')}: {position.coords.latitude}
                        , {position.coords.longitude}
                    </small>
                </div>
            )}
        </header>
    );
}

export default withTranslation()(withLocation(Footer));
