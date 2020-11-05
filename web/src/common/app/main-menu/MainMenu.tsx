import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import MobileTransformable from '../../core/mobile-transformable/MobileTransformable';

import './MainMenu.scss';
import { ReactComponent as MainMenuIcon } from './MainMenuIcon.svg';

function MainMenu(props: WithTranslation) {
    const { t } = props;

    return (
        <nav className="common-main-menu">
            <MobileTransformable
                headerTitle="noun.menu"
                openerIcon={<MainMenuIcon />}
                content={(setDrawerOpen) => {
                    return (
                        <ul>
                            <li>
                                <NavLink
                                    activeClassName="__active"
                                    to="/trails"
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    {t('noun.trails')}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName="__active"
                                    to="/map"
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    {t('noun.map')}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName="__active"
                                    to="/mountains"
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    {t('noun.mountains')}
                                </NavLink>
                            </li>
                        </ul>
                    );
                }}
            ></MobileTransformable>
        </nav>
    );
}

export default withTranslation()(MainMenu);
