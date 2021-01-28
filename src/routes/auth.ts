import * as express from 'express';
import * as token from '../modules/token';

import user from '../controllers/auth/user';
import login from '../controllers/auth/login';
import check from '../controllers/auth/check';
import register from '../controllers/auth/register';

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/check', token.check, check)

router.post('/user', token.check, user)

export default router;