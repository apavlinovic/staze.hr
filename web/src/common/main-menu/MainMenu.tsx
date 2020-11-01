import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import MobileTransformable from '../mobile-transformable/MobileTransformable';

import './MainMenu.scss';
import { ReactComponent as MainMenuIcon } from './MainMenuIcon.svg';

function MainMenu(props: WithTranslation) {
    const { t } = props;

    return (
        <nav className="common-main-menu">
            <MobileTransformable
                headerTitle="noun.menu"
                openerIcon={<MainMenuIcon />}
            >
                <ul>
                    <li>
                        <NavLink activeClassName="__active" to="/trails">
                            {t('noun.trails')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="__active" to="/map">
                            {t('noun.map')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="__active" to="/mountains">
                            {t('noun.mountains')}
                        </NavLink>
                    </li>
                </ul>
            </MobileTransformable>
        </nav>
    );
}

export default withTranslation()(MainMenu);
