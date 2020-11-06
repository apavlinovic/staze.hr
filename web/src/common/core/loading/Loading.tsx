import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import './Loading.scss';

function Loading({ t }: WithTranslation) {
    return (
        <section className="common-loading">
            <div className="lds-dual-ring"></div>
            <strong>{t('noun.loading')}</strong>
        </section>
    );
}

export default withTranslation()(Loading);
