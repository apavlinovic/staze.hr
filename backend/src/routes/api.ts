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
    ChangeUserRoleRoute,
} from './users/editUser';

import { GetTrailsRoute } from './trails/getTrails';
import { GetTrailByIdRoute, GetTrailBySlugRoute } from './trails/getTrail';
import { GetMountainNamesRoute } from './mountains/getAllMountainNames';
import { AccountRole } from '../database/enums/accountRole';

const router = express.Router();

router.post('/auth/login', LoginRoute);
router.post('/auth/register', RegistrationRoute);

router.get(
    '/users',
    checkIfUserAuthorized({
        authorizationRequiresUserIdMatch: false,
    }),
    GetUsersRoute,
);
router.get(
    '/user/:userId(\\d+)',
    checkIfUserAuthorized({
        authorizationRequiresUserIdMatch: true,
    }),
    GetUserByIdRoute,
);

router.put(
    '/user/:userId(\\d+)',
    checkIfUserAuthorized({
        authorizationRequiresUserIdMatch: true,
    }),
    UpdateUserRoute,
);

router.put(
    '/user/:userId(\\d+)/role/:role(\\d+)',
    checkIfUserAuthorized({
        authorizationRequiresUserIdMatch: false,
        allowedRoles: [AccountRole.Moderator],
    }),
    ChangeUserRoleRoute,
);

router.delete(
    '/user/:userId(\\d+)',
    checkIfUserAuthorized({
        authorizationRequiresUserIdMatch: true,
        allowedRoles: [AccountRole.Member, AccountRole.Moderator],
    }),
    DeleteUserRoute,
);

router.post(
    '/user/:userId(\\d+)/change-password',
    checkIfUserAuthorized({
        authorizationRequiresUserIdMatch: true,
    }),
    ChangePasswordRoute,
);

router.get('/trails', GetTrailsRoute);
router.get('/trail/:trailId(\\d+)', GetTrailByIdRoute);
router.get('/trail/:trailSlug', GetTrailBySlugRoute);

router.get('/mountains', GetMountainNamesRoute);

module.exports = router;
