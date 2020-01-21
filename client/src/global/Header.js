import React from 'react';
import GlobalSearch from './GlobalSearch';
import MainMenu from './MainMenu';
import Logo from './Logo';

import './Header.scss';

function Header() {
   
    return (
        <section className="ui--Header">
            <Logo></Logo>
            <MainMenu></MainMenu>
            <GlobalSearch></GlobalSearch>
        </section>
    );
}

export default Header;
