import React from 'react';
import MainMenu from './../MainMenu/MainMenu';
import Logo from './../Logo/Logo';

import './Header.scss';
import { AppBar, IconButton } from '@material-ui/core';

function Header() {
   
    return (
        <section className="ui--Header">
            <Logo></Logo>
            <MainMenu></MainMenu>
        </section>
    );
}

export default Header;
