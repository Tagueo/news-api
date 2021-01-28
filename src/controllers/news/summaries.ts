import { Response } from 'express';
import db from '../../modules/database'
import * as logger from "../../modules/logger";
import { ApiRequest, DbNews, NewsSummary } from '../../modules/types';

export default async function summaries(req: ApiRequest, res: Response) {
    try {
        // Select specified number of the latest news
        const response: Array<DbNews> = await db.makeQuery(`SELECT * FROM beaverApi.news ORDER BY date;`);

        let newsSummaries: Array<NewsSummary> = [];

        // Creates the summary of the retrieved news
        response.forEach(news => {
            let { id, title, author, date } = news;
            newsSummaries.push({ id, title, author, date })
        })

        res.json({
            success: true,
            count: newsSummaries.length,
            newsSummaries: newsSummaries
        })
    } catch (error) {
        logger.log("[News -> Summaries]", "Unknow error, see below:", 'error')
        console.error(error);

        res.json({
            success: false,
            error: "Unknow error. Please contact an administrator."
        })
    }
}
