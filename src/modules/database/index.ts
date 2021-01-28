/** @module database */

import * as mysql from "mysql";
import * as config from "../../config.json";

export const pool = mysql.createPool({
    host: "localhost",
    user: config.mysqlId,
    password: config.mysqlPass,
    // Set the pool's timezone to UTC => no timezone conversion problems
    timezone: 'UTC',
})

pool.on('connection', conn => {
    // Set the database's timezone to UTC => no timezone conversion problems
    conn.query("SET time_zone='+00:00';", error => {
        if(error){
            throw error
        }
    })
})

/**
 * Integrated function to escape the content going into the db
 * @param {any} value value to escape
 * @param {bool} stringifyObjects
 * @param {string} timezone Timezone to used encode the dates
 * @return {string} escaped string
 */
const escape = mysql.escape;

import { init } from "./init";
import { makeQuery } from "./makeQuery";

export default { makeQuery, escape, init };