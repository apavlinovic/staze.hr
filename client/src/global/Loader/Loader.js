import React from 'react';
import { withTranslation } from 'react-i18next';

import './Loader.scss';

function Loader({ t }) {
   
    return (
        <section className="ui--Loader">
            <i></i>
            <span>{ t('noun.loading') }</span>
        </section>
    );
}

export default withTranslation()(Loader);
