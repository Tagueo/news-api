/** @module token/generate */

import * as jwt from 'jsonwebtoken'
import * as config from '../../config.json'

/**
* Generates a token for the users authentication to the rest api
* @param {number} id user's id
* @param {string} username user's unique username
* @param {string} role user's unique username
*/
export function generate(id: number, username: string, role: string) {
  if (id && username && role) {
    let token = jwt.sign({
      id: id,
      username: username,
      role: role
    }, config.accessTokenSecret, {
      expiresIn: '7d'
    });
    return token;
  }
}
