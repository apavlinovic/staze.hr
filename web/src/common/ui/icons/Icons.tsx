import React from 'react';

import { ReactComponent as UserIcon } from './user.svg';
import { ReactComponent as HillsIcon } from './hills.svg';
import { ReactComponent as CloseIcon } from './close.svg';
import { ReactComponent as GhostIcon } from './ghost.svg';
import { ReactComponent as MenuIcon } from './hamburger-menu.svg';
import { ReactComponent as HikerIcon } from './hiker.svg';
import { ReactComponent as LightbulbIcon } from './lightbulb.svg';
import { ReactComponent as SearchIcon } from './search.svg';
import { ReactComponent as CampIllust } from './camp-illustration.svg';
import { ReactComponent as Pin } from './pin.svg';
import { ReactComponent as FlipMiddle } from './flip-middle.svg';
import { ReactComponent as PinOnMapIcon } from './pin-on-map.svg';

interface IconProperties {
    className?: string;
}

export const PinLocation = (props: IconProperties) => <Pin {...props} />;
export const Close = (props: IconProperties) => <CloseIcon {...props} />;
export const Ghost = (props: IconProperties) => <GhostIcon {...props} />;
export const Menu = (props: IconProperties) => <MenuIcon {...props} />;
export const Hiker = (props: IconProperties) => <HikerIcon {...props} />;
export const PinOnMap = (props: IconProperties) => <PinOnMapIcon {...props} />;
export const Lightbulb = (props: IconProperties) => (
    <LightbulbIcon {...props} />
);
export const Search = (props: IconProperties) => <SearchIcon {...props} />;
export const User = (props: IconProperties) => <UserIcon {...props} />;
export const Hills = (props: IconProperties) => <HillsIcon {...props} />;
export const CampIllustration = (props: IconProperties) => (
    <CampIllust {...props} />
);
export const Flip = (props: IconProperties) => <FlipMiddle {...props} />;
