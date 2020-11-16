import React from 'react';
import Helmet from 'react-helmet';
import { withTranslation, WithTranslation } from 'react-i18next';

interface withSEOConfiguration extends WithTranslation {
    title: string;
    description: string;
}

const siteMetadata = {
    title: 'Staze.hr',
    author: 'Staze.hr',
};

function SEO(props: withSEOConfiguration) {
    const { i18n, title, description } = props;
    const { language: lang } = i18n;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: description,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: description,
                },
            ].concat()}
        />
    );
}

export default withTranslation()(SEO);
