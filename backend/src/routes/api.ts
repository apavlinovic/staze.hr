import * as express from 'express';
import { checkIfUserAuthorized } from './middleware/isAuthorized';

import { LoginRoute } from './auth/login';
import { RegistrationRoute } from './auth/register';

import { GetUserByIdRoute } from './users/getUser';
import { GetUsersRoute } from './users/getUsers';
import {
    ChangePasswordRoute,
    UpdateUserRoute,
    DeleteUserRoute,
} from './users/editUser';

import { GetTrailsRoute } from './trails/getTrails';
import { GetTrailByIdRoute, GetTrailBySlugRoute } from './trails/getTrail';
import { GetMountainNamesRoute } from './mountains/getAllMountainNames';

const router = express.Router();

router.post('/auth/login', LoginRoute);
router.post('/auth/register', RegistrationRoute);

router.get('/users', checkIfUserAuthorized, GetUsersRoute);
router.get('/user/:userId(\\d+)', checkIfUserAuthorized, GetUserByIdRoute);

router.put('/user/:userId(\\d+)', checkIfUserAuthorized, UpdateUserRoute);
router.delete('/user/:userId(\\d+)', checkIfUserAuthorized, DeleteUserRoute);
router.post(
    '/user/:userId(\\d+)/change-password',
    checkIfUserAuthorized,
    ChangePasswordRoute,
);

router.get('/trails', GetTrailsRoute);
router.get('/trail/:trailId(\\d+)', GetTrailByIdRoute);
router.get('/trail/:trailSlug', GetTrailBySlugRoute);

router.get('/mountains', GetMountainNamesRoute);

module.exports = router;
