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
        <footer className="common-footer">
            <div className="grid grid-container">
                <div className="grid-item large-span-8 small-span-12">
                    <NavLink to="/" className="homepage-link">
                        <Logo variant="full" />
                    </NavLink>
                </div>
                <div className="grid-item large-span-4 small-span-12">
                    <div>
                        <h4>{t('noun.language')}</h4>
                        <LanguageSwitcher />
                        <hr />
                    </div>

                    {position && (
                        <div>
                            <h4>{t('noun.location')}</h4>

                            <small>
                                {t('strings.your_location')}:{' '}
                                {position.coords.latitude},{' '}
                                {position.coords.longitude}
                            </small>

                            <hr />
                        </div>
                    )}

                    <div>
                        <h4>{t('noun.copyright')}</h4>
                        <small>{t('strings.copyright')}</small>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default withTranslation()(withLocation(Footer));
