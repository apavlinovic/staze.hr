import React, { useContext } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { AuthContext } from '../../common/core/auth-context/AuthContext';

function Login(props: WithTranslation) {
    const { t } = props;
    const authContext = useContext(AuthContext);

    return (
        <main>
            <h1>{t('verb.login')}</h1>
            <button></button>
        </main>
    );
}

export default withTranslation()(Login);
