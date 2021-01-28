import { Response } from 'express';
import db from '../../modules/database'
import * as logger from "../../modules/logger";
import { ApiRequest, DbNews } from '../../modules/types';

export default async function like(req: ApiRequest, res: Response) {
    try {
        const newsId = parseInt(req.body.newsId);

        if (newsId) {
            // Retreive the liked news
            const response: Array<DbNews> = await db.makeQuery(`SELECT * FROM beaverApi.news WHERE id = ${newsId};`)

            if (response[0]) {
                const news = response[0];

                // Adds a like to the news
                await db.makeQuery(`UPDATE beaverApi.news SET likes = ${news.likes + 1} WHERE id = ${newsId};`)

                return res.json({
                    success: true
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
        logger.log("[News -> Like]", "Unknow error, see below:", 'error')
        console.error(error);

        res.json({
            success: false,
            error: "Unknow error. Please contact an administrator."
        })
    }
}