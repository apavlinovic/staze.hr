import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import './InfoElement.scss';
import { ReactComponent as InfoElementIcon } from './InfoElementIcon.svg';

interface InfoElementProps {
    message: string;
}

function InfoElement(props: InfoElementProps & WithTranslation) {
    const { t, message } = props;

    return (
        <section className="ui-no-results">
            <InfoElementIcon />

            <strong>{t(message)}</strong>
        </section>
    );
}

export default withTranslation()(InfoElement);
