import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link, Route, Switch } from 'react-router-dom';

import AdminTrails from './trails/Trails';
import AdminAreas from './areas/Areas';
import AdminTools from './tools/Tools';
import AdminTrailId from './trails/TrailId';
import AreaEdit from './areas/edit/AreaId';

import './Dashboard.scss';

function AdminDashboard(props: WithTranslation) {
    const { t } = props;

    return (
        <div className="admin-dashboard">
            <div className="admin-menu">
                <ul className="navigation">
                    <li>
                        <Link to="/admin/trails">{t('noun.trails')}</Link>
                    </li>
                    <li>
                        <Link to="/admin/areas">{t('noun.areas')}</Link>
                    </li>
                    <li>
                        <Link to="/admin/tools">{t('noun.tools')}</Link>
                    </li>
                </ul>
            </div>
            <div className="admin-content">
                <Switch>
                    <Route path="/admin/trails" exact>
                        <AdminTrails />
                    </Route>

                    <Route path="/admin/trails/:trailId" exact>
                        <AdminTrailId />
                    </Route>

                    <Route path="/admin/areas" exact>
                        <AdminAreas />
                    </Route>

                    <Route path="/admin/tools" exact>
                        <AdminTools />
                    </Route>

                    <Route path="/admin/areas/edit/:areaId" exact>
                        <AreaEdit />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default withTranslation()(AdminDashboard);
