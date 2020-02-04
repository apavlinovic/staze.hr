import React from 'react';
import { withTranslation } from 'react-i18next';

import './MainMenu.scss';
import { Link } from 'react-router-dom';

function MainMenu({ t }) {

    return (
        <section className="ui--MainMenu">
            <nav>
                <Link to="/">
                    { t('noun.homepage') }
                </Link>
                <a href="#">{ t('noun.map') }</a>
                <a href="#">{ t('noun.trails') }</a>
                <a href="#">{ t('strings.about') }</a>
                <a href="#">{ t('strings.contact') }</a>
            </nav>

            <button>
                {t('noun.menu')}
            </button>
        </section>
    );
}

export default withTranslation()(MainMenu);
