/** @module database/makeQuery */

import { pool } from "./index";

/**
 * Handler to make a query to the db without needing to handle errors every time
 * @param {string} queryString mysql query string
 * @returns {Promise<Array<any>>} Promise containing the result of the query
 */
export function makeQuery(queryString: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
        pool.query(queryString, function (error, results) {
            if (error)
                reject(error);

            else
                resolve(results);
        });
    });
}
