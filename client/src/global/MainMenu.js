import React from 'react';
import { withTranslation } from 'react-i18next';

function MainMenu({ t }) {

    return (
        <section>
            <nav>
                <a href="#">{ t('noun.homepage') }</a>
                <a href="#">{ t('noun.map') }</a>
                <a href="#">{ t('noun.trails') }</a>
            </nav>
        </section>
    );
}

export default withTranslation()(MainMenu);
