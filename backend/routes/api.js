const router = require('express').Router();
const getTrails = require('./trails/getTrails');
const GetAllMountainNames = require('./mountains/getAllMountainNames');
const getTrailHandlers = require('./trails/getTrail');

router.get('/trails', getTrails);
router.get('/trail/:trailId(\\d+)', getTrailHandlers.byId);
router.get('/trail/:trailSlug', getTrailHandlers.bySlug);
router.get('/mountains', GetAllMountainNames);

module.exports = router;
