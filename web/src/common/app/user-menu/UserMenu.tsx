import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import MobileTransformable from '../../core/mobile-transformable/MobileTransformable';

import './UserMenu.scss';
import { ReactComponent as MainMenuIcon } from './UserMenuIcon.svg';

function UserMenu(props: WithTranslation) {
    const { t } = props;

    return (
        <nav className="common-main-menu">
            <MobileTransformable
                headerTitle="strings.user_menu"
                openerIcon={<MainMenuIcon />}
                content={(setDrawerOpen) => {
                    return (
                        <ul>
                            <li>
                                <NavLink
                                    activeClassName="__active"
                                    to="/login"
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    {t('verb.login')}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName="__active"
                                    to="/register"
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    {t('verb.register')}
                                </NavLink>
                            </li>
                        </ul>
                    );
                }}
            ></MobileTransformable>
        </nav>
    );
}

export default withTranslation()(UserMenu);
