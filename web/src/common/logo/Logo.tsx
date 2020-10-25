import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import './Logo.scss';
interface LogoProps extends WithTranslation {
    variant: 'full' | 'graphic-only' | 'text-only';
}

function Logo(props: LogoProps) {
    const { variant = 'full', t } = props;

    const mode = useMediaQuery({
        query: `(prefers-color-scheme: dark)`,
    })
        ? 'dark'
        : 'light';

    const supportedVariants = {
        light: {
            full: {
                svg: '/branding/svg/staze-logo@vector.svg',
                retina: '/branding/2x/staze-logo@2x.png',
                normal: '/branding/1x/staze-logo.png',
            },

            'graphic-only': {
                svg: '/branding/svg/staze-grafika@vector.svg',
                retina: '/branding/2x/staze-grafika@2x.png',
                normal: '/branding/1x/staze-grafika.png',
            },

            'text-only': {
                svg: 'branding/svg/staze-text@vector.svg',
                retina: 'branding/2x/staze-text@2x.png',
                normal: 'branding/1x/staze-text.png',
            },
        },

        dark: {
            full: {
                svg: '/branding/svg/staze-logo-white@vector.svg',
                retina: '/branding/2x/staze-logo-white@2x.png',
                normal: '/branding/1x/staze-logo-white.png',
            },

            'graphic-only': {
                svg: '/branding/svg/staze-grafika-white@vector.svg',
                retina: '/branding/2x/staze-grafika-white@2x.png',
                normal: '/branding/1x/staze-grafika-white.png',
            },

            'text-only': {
                svg: 'branding/svg/staze-text-white@vector.svg',
                retina: 'branding/2x/staze-text-white@2x.png',
                normal: 'branding/1x/staze-text-white.png',
            },
        },
    };

    return (
        <picture className="common-logo">
            <source
                type="image/svg+xml"
                srcSet={supportedVariants[mode][variant].svg}
            />
            <img
                src={supportedVariants[mode][variant].normal}
                srcSet={`${supportedVariants[mode][variant].retina} 2x`}
                alt={t('strings.logo_description')}
            />
        </picture>
    );
}

export default withTranslation()(Logo);
