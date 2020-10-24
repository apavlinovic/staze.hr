import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import './MainMenu.scss';

function MainMenu(props: WithTranslation) {
    const { t } = props;

    return (
        <nav className="common-main-menu">
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
        </nav>
    );
}

export default withTranslation()(MainMenu);
