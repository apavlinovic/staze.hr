import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import './OmniSearch.scss';

function OmniSearch(props: WithTranslation) {
    const { t } = props;
    return (
        <section className="common-omni-search">
            <input type="text" placeholder={t('noun.search')} />
        </section>
    );
}

export default withTranslation()(OmniSearch);
