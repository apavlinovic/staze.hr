import React from 'react';
import GlobalSearch from './../GlobalSearch/GlobalSearch';
import MainMenu from './../MainMenu/MainMenu';
import Logo from './../Logo/Logo';

import './Header.scss';

function Header() {
   
    return (
        <section className="ui--Header">
            <Logo></Logo>
            <GlobalSearch></GlobalSearch>
            <MainMenu></MainMenu>
        </section>
    );
}

export default Header;
