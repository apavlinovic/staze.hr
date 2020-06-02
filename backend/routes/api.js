const router = require('express').Router();
const { checkIfUserAuthorized } = require('./middleware/IsAuthorized');

router.post('/auth/login', require('./auth/login'));
router.post('/auth/register', require('./auth/register'));

router.get('/users', checkIfUserAuthorized, require('./users/getUsers'));
router.get(
    '/user/:userId(\\d+)',
    checkIfUserAuthorized,
    require('./users/getUser'),
);

router.put(
    '/user/:userId(\\d+)',
    checkIfUserAuthorized,
    require('./users/editUser').update,
);
router.delete(
    '/user/:userId(\\d+)',
    checkIfUserAuthorized,
    require('./users/editUser').delete,
);
router.post(
    '/user/:userId(\\d+)/change-password',
    checkIfUserAuthorized,
    require('./users/editUser').changePassword,
);

router.get('/trails', require('./trails/getTrails'));
router.get('/trail/:trailId(\\d+)', require('./trails/getTrail').byId);
router.get('/trail/:trailSlug', require('./trails/getTrail').bySlug);

router.get('/mountains', require('./mountains/getAllMountainNames'));

module.exports = router;
