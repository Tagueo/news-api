import { Response } from 'express';
import db from '../../modules/database'
import * as logger from "../../modules/logger";
import { ApiRequest, DbNews, NewsSummary } from '../../modules/types';

export default async function fetch(req: ApiRequest, res: Response) {
    try {
        if (!req.query.count) {
            return res.json({
                success: false,
                error: "Count parameter missing."
            })
        }

        const count: number = parseInt(req.query.count.toString());

        // Select specified number of the latest news
        const response: Array<DbNews> = await db.makeQuery(`SELECT * FROM beaverApi.news ORDER BY date LIMIT ${count};`);

        let newsSummaries: Array<NewsSummary> = [];

        // Creates the summary of the retrieved news
        response.forEach(news => {
            let { id, title, author, date } = news;
            newsSummaries.push({ id, title, author, date })
        })

        res.json({
            success: true,
            newsSummaries: newsSummaries
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
