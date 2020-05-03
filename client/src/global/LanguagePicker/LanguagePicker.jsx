import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';

import './LanguagePicker.scss';
import { Button, Card, CardActions, CardContent } from '@material-ui/core';

function LanguagePicker({ t, i18n }) {
    const [language, setLanguage] = useState(i18n.language);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setLanguage(language);
    };

    return (
        <section className="ui--LanguagePicker">
            <Card>
                <CardContent>
                    <label>{language}</label>
                </CardContent>

                <CardActions>
                    <Button size="small" onClick={() => changeLanguage('en')}>
                        EN
                    </Button>
                    <Button size="small" onClick={() => changeLanguage('hr')}>
                        HR
                    </Button>
                </CardActions>
            </Card>
        </section>
    );
}

export default withTranslation()(LanguagePicker);
