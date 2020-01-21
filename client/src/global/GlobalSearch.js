import React from 'react';
import { withTranslation } from 'react-i18next';

function GlobalSearch({ t }) {

    return (
        <section>
            <input type="text" placeholder={ t('noun.search') } />
        </section>
    );
}

export default withTranslation()(GlobalSearch);
