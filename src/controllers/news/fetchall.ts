import { Response } from 'express';
import db from '../../modules/database'
import * as logger from "../../modules/logger";
import { ApiRequest, DbNews, NewsSummary } from '../../modules/types';

export default async function fetchall(req: ApiRequest, res: Response) {
    try {
        // Select specified number of the latest news
        const response: Array<DbNews> = await db.makeQuery(`SELECT * FROM beaverApi.news ORDER BY date;`);

        res.json({
            success: true,
            count: response.length,
            news: response
        })
    } catch (error) {
        logger.log("[News -> Fetch]", "Unknow error, see below:", 'error')
        console.error(error);

        res.json({
            success: false,
            error: "Unknow error. Please contact an administrator."
        })
    }
}
