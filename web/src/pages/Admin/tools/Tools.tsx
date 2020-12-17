import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

function AdminTools(props: WithTranslation) {
    const { t } = props;

    return <h1>{t('noun.tools')}</h1>;
}

export default withTranslation()(AdminTools);
