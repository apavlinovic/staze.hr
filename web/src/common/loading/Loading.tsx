import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import './Loading.scss';

function Loading({ t }: WithTranslation) {
    return (
        <section className="common-loading">
            <i></i>
            <span>{t('noun.loading')}</span>
        </section>
    );
}

export default withTranslation()(Loading);
