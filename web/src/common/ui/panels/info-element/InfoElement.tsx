import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Lightbulb } from '../../icons/Icons';

import './InfoElement.scss';

interface InfoElementProps {
    message: string;
}

function InfoElement(props: InfoElementProps & WithTranslation) {
    const { t, message } = props;

    return (
        <section className="ui-no-results">
            <Lightbulb />

            <strong>{t(message)}</strong>
        </section>
    );
}

export default withTranslation()(InfoElement);
