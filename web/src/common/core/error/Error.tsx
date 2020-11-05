import React from 'react';
import { ApolloError } from '@apollo/client';

import './Error.scss';

interface ErrorProps {
    error: ApolloError;
}

function Error(props: ErrorProps) {
    const { error } = props;
    return (
        <section className="common-error">
            <h3>Error Name</h3>
            {error.name}

            <h3>Message</h3>
            <p>{error.message}</p>

            <h3>Extra info</h3>
            <p>{error.extraInfo || '-'}</p>

            <h3>Stack</h3>
            <code>{error.stack}</code>

            <h3>GQL Errors</h3>
            {error.graphQLErrors.map((value, index) => (
                <p key={`gql-error-${index}`}>
                    {value.name} - {value.message}
                </p>
            ))}
        </section>
    );
}

export default Error;
