require('dotenv').config();

import { DATABASE_CONNECTION } from '../src/database/db-connection';
import { TrailResolver } from '../src/modules/trails/trail.resolver';
import { AreaResolver } from '../src/modules/areas/area.resolver';
import { launch } from 'puppeteer';
import { writeFileSync } from 'fs';
import { join } from 'path';

const SERVER_ROOT = 'http://localhost:3000';

(async function () {
    DATABASE_CONNECTION.then(async () => {
        const trailResolver = new TrailResolver();
        const trails = await trailResolver.getTrails({
            pageSize: 2000,
            offset: 0,
            orderBy: null,
            maintainer: null,
            nearby: null,
            mountain: null,
            distance: null,
            duration: null,
        });

        const browser = await launch({
            headless: true,
            defaultViewport: null,
        });

        const page = await browser.newPage();

        for (const trail of trails.items) {
            await page.goto(`${SERVER_ROOT}/trail/${trail.slug}`, {
                waitUntil: 'networkidle0',
            });

            const htmlContent = await page.content();
            const filename = `trail-${trail.slug}.html`;

            writeFileSync(
                join(__dirname, `../../artifacts/${filename}`),
                htmlContent,
            );
        }

        await browser.close();
    });
})();

(async function () {
    DATABASE_CONNECTION.then(async () => {
        const areaResolver = new AreaResolver();
        const areas = await areaResolver.getAreas({
            pageSize: 1000,
            offset: 0,
            orderBy: null,
        });

        const browser = await launch({
            headless: true,
            defaultViewport: null,
        });

        const page = await browser.newPage();

        for (const area of areas.items) {
            await page.goto(`${SERVER_ROOT}/area/${area.slug}`, {
                waitUntil: 'networkidle2',
            });

            const htmlContent = await page.content();
            const filename = `area-${area.slug}.html`;

            writeFileSync(
                join(__dirname, `../../artifacts/${filename}`),
                htmlContent,
            );
        }

        await browser.close();
    });
})();
