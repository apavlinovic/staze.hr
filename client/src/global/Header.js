import React from 'react';
import GlobalSearch from './GlobalSearch';
import LanguagePicker from './LanguagePicker';
import MainMenu from './MainMenu';

function Header() {
   
    return (
        <section>
            <GlobalSearch></GlobalSearch>
            <LanguagePicker></LanguagePicker>
            <MainMenu></MainMenu>
        </section>
    );
}

export default Header;
