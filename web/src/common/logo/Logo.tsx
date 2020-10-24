import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface LogoProps extends WithTranslation {
    variant: 'normal' | 'white';
}

function Logo(props: LogoProps) {
    const { variant = 'normal', t } = props;

    const supportedVariants = {
        normal: {
            svg: '/branding/svg/staze-logo@vector.svg',
            retina: '/branding/2x/staze-logo@2x.png',
            normal: '/branding/1x/staze-logo.png',
        },

        white: {
            svg: 'branding/svg/staze-logo-white@vector.svg',
            retina: 'branding/2x/staze-logo-white@2x.png',
            normal: 'branding/1x/staze-logo-white.png',
        },
    };

    return (
        <picture className="Common-logo">
            <source
                type="image/svg+xml"
                srcSet={supportedVariants[variant].svg}
            />
            <img
                src={supportedVariants[variant].normal}
                srcSet={`${supportedVariants[variant].retina} 2x`}
                alt={t('strings.logo_description')}
            />
        </picture>
    );
}

export default withTranslation()(Logo);
