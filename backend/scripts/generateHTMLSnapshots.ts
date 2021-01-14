require('dotenv').config();

import { DATABASE_CONNECTION } from '../src/database/db-connection';
// import { TrailResolver } from '../src/modules/trails/trail.resolver';

(async function () {
    DATABASE_CONNECTION.then(async () => {
        // const trailResolver = new TrailResolver();
        // const trails = await trailResolver.getTrails({
        //     pageSize: 3,
        //     offset: 0,
        //     orderBy: null,
        //     maintainer: null,
        //     nearby: null,
        //     mountain: null,
        //     distance: null,
        //     duration: null,
        // });

        // for (const trail of trails.items) {
        //     // #1 KORISTIT PUPETEER ZA DOHVATIT HTML OD OVOG TRAILA
        //     // #2 SPREMIT HTML U ../artifacts (1004-zapadak-crni-vrh.html)
        // }
    });
})();
