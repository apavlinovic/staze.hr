import React, { useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import './LanguageSwitcher.scss';

const LANGUAGES = ['en', 'hr'];

function LanguageSwitcher(props: WithTranslation) {
    const { i18n } = props;
    const [activeLanguage, setActiveLanguage] = useState(i18n.language);
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setActiveLanguage(lng);
    };

    const renderLanguageMenu = (actLanguage: string) => {
        return LANGUAGES.map((l, i) => (
            <button
                className={actLanguage === l ? '__active' : undefined}
                key={`language-option-${i}`}
                onClick={() => changeLanguage(l)}
            >
                {l}
            </button>
        ));
    };

    return (
        <section className="common-language-switcher">
            <div className="languages-list">
                {renderLanguageMenu(activeLanguage)}
            </div>
        </section>
    );
}

export default withTranslation()(LanguageSwitcher);
