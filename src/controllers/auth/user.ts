import { log } from '../../modules/logger';
import { Response } from 'express';
import { ApiRequest } from '../../modules/types';

export default function user(req: ApiRequest, res: Response) {
    log('[Auth -> User]', req.decoded.username)

    // Uses the info of the token decoded by the middleware to send the user's info
    res.json({
        success: true,
        id:  req.decoded.id,
        username: req.decoded.username,
        role: req.decoded.role
    })
  }