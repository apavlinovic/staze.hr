import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';
import Logo from './../../core/logo/Logo';
import MainMenu from './../main-menu/MainMenu';
import UserMenu from './../user-menu/UserMenu';
import OmniSearch from './../../ui/omni-search/OmniSearch';

function Header() {
    return (
        <header className="common-header">
            <div className="item logo">
                <NavLink to="/" className="homepage-link">
                    <Logo variant="graphic-only" />
                </NavLink>
            </div>
            <div className="item menu">
                <MainMenu />
            </div>
            <div className="item search">
                <OmniSearch />
            </div>
            <div className="item user-menu">
                <UserMenu />
            </div>
        </header>
    );
}

export default Header;
