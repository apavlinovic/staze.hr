import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import { Query } from '../types';

import Loading from '../common/core/loading/Loading';
import Error from '../common/core/error/Error';
import Card from '../common/ui/card/Card';

const MOUNTAINS_QUERY = gql`
    query getMountains {
        mountains {
            name
            trails
            urlFriendlyName
        }
    }
`;

function MountainsPage(props: WithTranslation) {
    const { t } = props;
    const { loading, error, data } = useQuery<Query>(MOUNTAINS_QUERY);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        console.warn(error);
        return <Error error={error} />;
    }

    return (
        <main>
            <h1>{t('noun.mountains')}</h1>

            {/* TODO: FIGURE OUT A MOUNTAINS PAGE DESIGN */}
            {data?.mountains.map((value, index) => (
                <div key={`mountain-${index}`}>
                    <Card linkTo={`/mountain/${value.urlFriendlyName}`}>
                        {value.name} ({value.trails})
                    </Card>
                </div>
            ))}
        </main>
    );
}

export default withTranslation()(MountainsPage);
