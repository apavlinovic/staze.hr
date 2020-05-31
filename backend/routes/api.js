const router = require('express').Router();

router.get('/users', require('./users/getUsers'));

router.get('/trails', require('./trails/getTrails'));
router.get('/trail/:trailId(\\d+)', require('./trails/getTrail').byId);
router.get('/trail/:trailSlug', require('./trails/getTrail').bySlug);

router.get('/mountains', require('./mountains/getAllMountainNames'));

module.exports = router;
