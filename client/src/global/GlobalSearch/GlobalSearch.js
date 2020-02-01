import React from 'react';
import { withTranslation } from 'react-i18next';

import './GlobalSearch.scss';
import { Input, Card, CardContent, CardActions, Button } from '@material-ui/core';

function GlobalSearch({ t }) {

    return (
        <section className="ui--GlobalSearch">
            <Card>
                <CardContent>
                    <Input type="text" placeholder={ t('noun.search') } />
                </CardContent>
                <CardActions>
                    <Button>{ t('noun.search')}</Button>
                </CardActions>
            </Card>
        </section>
    );
}

export default withTranslation()(GlobalSearch);
