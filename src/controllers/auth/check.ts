import { log } from '../../modules/logger';
import { Response } from 'express';
import { ApiRequest } from '../../modules/types';


export default function check(req: ApiRequest, res: Response) {
  log('[Auth -> Check]', 'Login check - ' + req.decoded.username)

  // Token passed the middleware's verification, so its still valid
  res.json({
    valid: true
  })
}