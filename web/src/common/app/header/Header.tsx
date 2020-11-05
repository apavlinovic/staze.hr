import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';
import Logo from './../../core/logo/Logo';
import MainMenu from './../main-menu/MainMenu';
import OmniSearch from './../../ui/omni-search/OmniSearch';

function Header() {
    return (
        <header className="common-header">
            <div className="item">
                <NavLink to="/" className="homepage-link">
                    <Logo variant="graphic-only" />
                </NavLink>
            </div>
            <div className="item">
                <MainMenu />
            </div>
            <div className="item">
                <OmniSearch />
            </div>
        </header>
    );
}

export default Header;
