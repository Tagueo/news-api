import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from './modules/logger'
import db from './modules/database'
import * as cors from 'cors';
import * as config from './config.json';

import { auth, news } from './routes';

const app = express()

// Middlewares
app.use(logger.httpLog)
app.use(cors()); // Fix to allows cross origin requests
app.use(bodyParser.json()); // Parse the received body in JSON (REST Api ftw)

db.init();

/**
 * Auth endpoint
 * Routes located in /routes/auth
 * Controllers located in /controllers/auth
 */
app.use('/auth', auth);

/**
 * News endpoint
 * Routes located in /routes/news
 * Controllers located in /controllers/news
 */
app.use('/news', news);

app.use(function (_req, res) {
    res.status(404).json({
        succes: false,
        error: "Unknown path"
    })
})

app.listen(config.port, () => {
    logger.log(`[API]`, `Started the Beaver API on port ${config.port}`, `info`)
    logger.log(`[API]`, `François is a Doggo`, `info`)
});