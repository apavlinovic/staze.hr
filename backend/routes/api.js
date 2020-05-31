const router = require('express').Router();

router.get('/users', require('./users/getUsers'));
router.get('/user/:userId(\\d+)', require('./users/getUser'));

router.post('/user', require('./users/editUser').create);
router.put('/user/:userId(\\d+)', require('./users/editUser').update);
router.delete('/user/:userId(\\d+)', require('./users/editUser').delete);

router.get('/trails', require('./trails/getTrails'));
router.get('/trail/:trailId(\\d+)', require('./trails/getTrail').byId);
router.get('/trail/:trailSlug', require('./trails/getTrail').bySlug);

router.get('/mountains', require('./mountains/getAllMountainNames'));

module.exports = router;
