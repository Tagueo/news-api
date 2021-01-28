import { Response } from 'express';
import db from '../../modules/database'
import * as logger from "../../modules/logger";
import * as token from "../../modules/token"
import { ApiRequest, DbUser } from '../../modules/types';

export default async function login(req: ApiRequest, res: Response) {
    try {
        // Read username and password from request body
        const { username, password } = req.body;

        console.log(req.body);

        // Checks if a user exists in the db with the same credentials
        const response: Array<DbUser> = await db.makeQuery(`SELECT * FROM beaverApi.users WHERE \`username\` = ${db.escape(username)} AND \`password\` = ${db.escape(password)};`)

        // If the user exists, he is in the first index of the array
        if (response[0]) {
            const user = response[0];

            // Generate an access token
            const accessToken = token.generate(user.id, user.username, user.role)

            logger.log('[Auth -> Login]', 'Login - ' + user.username)

            // Send the access token
            res.json({
                success: true,
                token: accessToken
            });
        } else {
            res.json({
                success: false,
                error: 'Username or password incorrect'
            });
        }
    } catch (error) {
        logger.log("[Auth -> Login]", "Unknow error, see below:", 'error')
        console.error(error);

        res.json({
            success: false,
            error: "Unknow error. Please contact an administrator."
        })
    }
}