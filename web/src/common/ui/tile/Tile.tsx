import React, { PropsWithChildren } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import './Tile.scss';

interface TileProps {
    header?: string;
    variant?: 'default' | 'edge-to-edge-image';
}

function Tile(props: PropsWithChildren<TileProps> & WithTranslation) {
    const { children, variant = 'default', header, t } = props;

    return (
        <div className={`ui--tile ${variant}`}>
            {header && <h2>{t(header)}</h2>}

            <div className="content">{children}</div>
        </div>
    );
}

export default withTranslation()(Tile);
