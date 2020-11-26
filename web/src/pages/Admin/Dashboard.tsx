import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link, Route, Switch } from 'react-router-dom';

import AdminTrails from './trails/Trails';
import AdminAreas from './areas/Areas';
import AdminTools from './tools/Tools';
import AdminTrailId from './trails/TrailId';

import './Dashboard.scss';

function AdminDashboard(props: WithTranslation) {
    const { t } = props;

    return (
        <div className="admin-dashboard">
            <div>
                <h1>ADMIN</h1>
                <br />
                <ul className="navigation">
                    <Link to="/admin/trails">
                        <li>{t('noun.trails')}</li>
                    </Link>
                    <br />
                    <Link to="/admin/areas">
                        <li>{t('noun.areas')}</li>
                    </Link>
                    <br />
                    <Link to="/admin/tools">
                        <li>{t('noun.tools')}</li>
                    </Link>
                </ul>
            </div>

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
            </Switch>
        </div>
    );
}

export default withTranslation()(AdminDashboard);
