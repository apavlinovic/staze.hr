import React from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

import './Footer.scss';
import Logo from './../logo/Logo';
import LanguageSwitcher from './../language-switcher/LanguageSwitcher';

function Footer(props: WithTranslation) {
    const { t } = props;

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
        </header>
    );
}

export default withTranslation()(Footer);
