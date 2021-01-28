/** @module token/check */

import * as jwt from 'jsonwebtoken'
import * as config from '../../config.json'
import { ApiRequest } from '../types';
import { Request, Response, NextFunction } from "express";
import { log } from '../logger/log.js';

/**
 * Express middleware which checks the validity of the auth token passed with a request to the api
 * @param {ApiRequest} req Express request
 * @param {Response} res Express response
 * @param {NextFunction} next Express callback
 */
export function check(req: ApiRequest, res: Response, next: NextFunction) {
  let token: string = req.headers['authorization'];

  if (!token) {
    log(`[Token -> Check]`, `Auth Token not supplied\nRequest : ${req.path}`, 'error')
    return res.status(403).send({
      success: false,
      error: 'Auth token is not supplied'
    });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, config.accessTokenSecret, (err: Error, decoded: any) => {
    if (err) {
      log(`[Token -> Check]`, `Invalid token supplied\nRequest : ${req.path}\nToken: ${token}`, 'error')
      return res.status(403).send({
        success: false,
        error: 'Auth token is invalid'
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
}
