import { Response } from 'express';
import db from '../../modules/database'
import * as logger from "../../modules/logger";
import { ApiRequest, DbComment, DbNews } from '../../modules/types';

export default async function get(req: ApiRequest, res: Response) {
    try {
        const newsId = parseInt(req.query.newsId.toString());

        if (newsId) {
            // Retreive the news
            const response: Array<DbNews> = await db.makeQuery(`SELECT * FROM beaverApi.news WHERE id = ${newsId};`)

            // Retreive the comments associed with the news
            const comments: Array<DbComment> = await db.makeQuery(`SELECT * FROM beaverApi.comments WHERE newsId = ${newsId};`)

            // If the news exists
            if (response[0]) {
                const news = response[0];

                // Send the news and the comments
                return res.json({
                    success: true,
                    news: news,
                    comments: comments
                })
            } else {
                return res.json({
                    success: false,
                    error: "Invalid id"
                })
            }
        } else {
            return res.json({
                success: false,
                error: "Invalid id"
            })
        }
    } catch (error) {
        logger.log("[News -> Get]", "Unknow error, see below:", 'error')
        console.error(error);

        res.json({
            success: false,
            error: "Unknow error. Please contact an administrator."
        })
    }
}