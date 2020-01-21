import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';

function LanguagePicker({ t, i18n }) {
    const [ language, setLanguage ] = useState(i18n.language);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setLanguage(language);
    }


    return (
        <section>
            { language }

            <button onClick={ () => changeLanguage("en") }>EN</button>
            <button onClick={ () => changeLanguage("hr") }>HR</button>
        </section>
    );
}

export default withTranslation()(LanguagePicker);
