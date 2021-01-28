import { Response } from 'express';
import db from '../../../modules/database'
import * as logger from "../../../modules/logger";
import { ApiRequest } from '../../../modules/types';

export default async function deletec(req: ApiRequest, res: Response) {
    try {
        // Retreive the parameters from the body
        const commentId = parseInt(req.body.commentId);

        if (commentId) {
            // Checks if the user deleting the comment is allowed to
            if (req.decoded.role === "admin") {
                // Delete from the db
                await db.makeQuery(`DELETE FROM beaverApi.comments WHERE id = ${commentId};`)

                logger.log("[News/Comments -> Delete]", "Deleted comment " + commentId, 'info')
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
        logger.log("[News/Comments -> Delete]", "Unknow error, see below:", 'error')
        console.error(error);

        res.json({
            success: false,
            error: "Unknow error. Please contact an administrator."
        })
    }
}