import React from 'react';
import { withTranslation } from 'react-i18next';

import './GlobalSearch.scss';

function GlobalSearch({ t }) {

    return (
        <section className="ui--GlobalSearch">
            <input type="text" placeholder={ t('noun.search') } />
        </section>
    );
}

export default withTranslation()(GlobalSearch);
