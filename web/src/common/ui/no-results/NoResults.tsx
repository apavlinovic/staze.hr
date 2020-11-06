import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import './NoResults.scss';
import { ReactComponent as NoResultsIcon } from './NoResultsIcon.svg';

function NoResults(props: WithTranslation) {
    const { t } = props;

    return (
        <section className="ui-no-results">
            <NoResultsIcon />

            <strong>{t('strings.no_results')}</strong>
        </section>
    );
}

export default withTranslation()(NoResults);
