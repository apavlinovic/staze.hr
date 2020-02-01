import React from 'react';
import LanguagePicker from '../LanguagePicker/LanguagePicker';
import GlobalSearch from '../GlobalSearch/GlobalSearch';

import './Footer.scss';

function Footer() {
   
    return (
        <footer className="ui--Footer">
            <GlobalSearch></GlobalSearch>
            <LanguagePicker></LanguagePicker>
        </footer>
    );
}

export default Footer;
