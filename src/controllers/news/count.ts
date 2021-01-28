import { Response } from 'express';
import db from '../../modules/database'
import * as logger from "../../modules/logger";
import { ApiRequest, DbNews } from '../../modules/types';

export default async function count(req: ApiRequest, res: Response) {
    try {
        // Select the id to count every news posted
        const response:Array<DbNews> = await db.makeQuery("SELECT id FROM beaverApi.news");

        res.json({
            number: response.length
        })
    } catch (error) {
        logger.log("[News -> Count]", "Unknow error, see below:", 'error')
        console.error(error);

        res.json({
            success: false,
            error: "Unknow error. Please contact an administrator."
        })
    }
}
