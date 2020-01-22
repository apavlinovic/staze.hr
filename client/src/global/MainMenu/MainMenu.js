import React from 'react';
import { withTranslation } from 'react-i18next';

import './MainMenu.scss';

function MainMenu({ t }) {

    return (
        <section className="ui--MainMenu">
            <nav>
                <a href="#">{ t('noun.homepage') }</a>
                <a href="#">{ t('noun.map') }</a>
                <a href="#">{ t('noun.trails') }</a>
                <a href="#">{ t('strings.about') }</a>
                <a href="#">{ t('strings.contact') }</a>
            </nav>
        </section>
    );
}

export default withTranslation()(MainMenu);
