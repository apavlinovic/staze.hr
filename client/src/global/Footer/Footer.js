import React from 'react';
import LanguagePicker from '../LanguagePicker/LanguagePicker';
import GlobalSearch from '../GlobalSearch/GlobalSearch';

import './Footer.scss';
import Card from '../Card/Card';

function Footer() {
   
    return (
        <footer className="ui--Footer">
            <Card>
                <GlobalSearch></GlobalSearch>
            </Card>
            <Card>
                <LanguagePicker></LanguagePicker>
            </Card>
        </footer>
    );
}

export default Footer;
