import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Ghost } from '../../icons/Icons';

import './NoResults.scss';

function NoResults(props: WithTranslation) {
    const { t } = props;

    return (
        <section className="ui-no-results">
            <Ghost />

            <strong>{t('strings.no_results')}</strong>
        </section>
    );
}

export default withTranslation()(NoResults);
