import { Response } from 'express';
import db from '../../modules/database'
import * as logger from "../../modules/logger";
import { ApiRequest, DbNews } from '../../modules/types';

export default async function create(req: ApiRequest, res: Response) {
    try {
        // Retrieve the parameters from the body
        let newsTitle = req.body.newsTitle;
        let newsBody = req.body.newsBody;

        // Checks if the user creating the news is allowed to
        if (req.decoded.role != "admin") {
            return res.json({
                success: false,
                error: "permission denied"
            })
        }

        if (!newsBody || !newsTitle) {
            return res.json({
                success: false,
                error: "empty newsTitle or newsBody"
            })
        }

        const news:DbNews = {
            title: newsTitle,
            content: newsBody,
            date: Date.now(),
            author: req.decoded.username,
            likes: 0
        }

        // Insert the news in the db
        await db.makeQuery(`INSERT INTO beaverApi.news (title, content, author)
            VALUES (${db.escape(news.title)}, ${db.escape(news.content)}, ${db.escape(news.author)})`);

        logger.log("[News -> Create]", "Created the news " + news.title, 'success')

        return res.json({
            success: true,
        })
    } catch (error) {
        logger.log("[News -> Create]", "Unknow error, see below:", 'error')
        console.error(error);

        res.json({
            success: false,
            error: "Unknow error. Please contact an administrator."
        })
    }
}