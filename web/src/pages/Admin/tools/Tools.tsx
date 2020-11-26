import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { withTranslation, WithTranslation } from 'react-i18next';

import { Query, QueryTrailArgs } from '../../../types';
import { Link, useParams } from 'react-router-dom';

function AdminTools(props: WithTranslation) {
    const { t } = props;
    const { slug } = useParams<{
        slug: string;
    }>();

    return (
        <div className="admin-tools">
            <h1>Tools</h1>
        </div>
    );
}

export default withTranslation()(AdminTools);
