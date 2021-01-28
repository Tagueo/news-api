import { Response } from 'express';
import db from '../../modules/database'
import * as logger from "../../modules/logger";
import { ApiRequest } from '../../modules/types';

export default async function get(req: ApiRequest, res: Response) {
    try {
        const newsId = parseInt(req.body.newsId);

        if (newsId) {
            // Checks if the user deleting the news is allowed to
            if (req.decoded.role === "admin") {
                // Deletes the news and its associed comments from the db
                await db.makeQuery(`DELETE FROM beaverApi.news WHERE id = ${newsId};`)
                await db.makeQuery(`DELETE FROM beaverApi.comments WHERE newsId = ${newsId};`)

                logger.log("[News -> Delete]", "Deleted news " + newsId, 'success')
                return res.json({
                    success: true
                })
            } else {
                return res.json({
                    success: false,
                    error: "permission denied"
                })
            }
        } else {
            return res.json({
                success: false,
                error: "Invalid id"
            })
        }
    } catch (error) {
        logger.log("[News -> Delete]", "Unknow error, see below:", 'error')
        console.error(error);

        res.json({
            success: false,
            error: "Unknow error. Please contact an administrator."
        })
    }
}