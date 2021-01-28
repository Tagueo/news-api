import { Response } from 'express';
import db from '../../modules/database';
import { ApiRequest, DbUser } from '../../modules/types';
import * as logger from "../../modules/logger";

export default async function register(req: ApiRequest, res: Response) {
    try {
        const { username, password } = req.body;

        // Checks if the provided credentials are valid
        if (username == "" || password == "" || password.length < 8 || username.length >= 255) {
            return res.json({
                success: false,
                error: "Invalid username and/or password. Password must be at least 8 chars long and username at most 255 chars long."
            })
        }

        // Create the user object for later use
        const user: DbUser = {
            username,
            password,
            role: "member"
        }

        // Checks if the username is already taken
        const exists = await db.makeQuery(`SELECT * FROM beaverApi.users WHERE username = ${db.escape(user.username)};`)

        if (exists.length > 0) {
            return res.json({
                success: false,
                error: "Username already taken."
            })
        }

        // Inserts the new user into the db
        await db.makeQuery(`INSERT INTO beaverApi.users (username, password) VALUES (${db.escape(username)}, ${db.escape(password)});`)

        // No Error -> insertion successfull
        logger.log("[Auth -> Register]", "Created user: "+ user.username, 'success')
        return res.json({
            success: true
        })
    } catch (error) {
        logger.log("[Auth -> Register]", "Unknow error, see below:", 'error')
        console.error(error);
        
        res.json({
            success: false,
            error: "Unknow error. Please contact an administrator."
        })
    }
}
