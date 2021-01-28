import { Response } from 'express';
import db from '../../../modules/database'
import * as logger from "../../../modules/logger";
import { ApiRequest, DbComment } from '../../../modules/types';

export default async function comment(req: ApiRequest, res: Response) {
    try {
        // Retrieves the parameters from the body
        let newsId = parseInt(req.body.newsId);
        let content = req.body.content;

        if (!content || !newsId) {
            return res.json({
                success: false,
                error: "newsId and/or content are empty."
            })
        }

        // Creating the object of the comment for later use
        let comment: DbComment = {
            content: content,
            newsId: newsId,
            date: Date.now(),
            author: req.decoded.username
        }

        // Insert the comment into the db
        await db.makeQuery(`INSERT INTO beaverApi.comments (content, newsId, author)
            VALUES (${db.escape(comment.content)}, ${db.escape(comment.newsId)}, ${db.escape(comment.author)})`);

        logger.log("[News/Comments -> comment]", "New comment on news " + newsId, 'info')

        return res.json({
            success: true
        })
    } catch (error) {
        logger.log("[News/Comments -> comment]", "Unknow error, see below:", 'error')
        console.error(error);

        res.json({
            success: false,
            error: "Unknow error. Please contact an administrator."
        })
    }
}