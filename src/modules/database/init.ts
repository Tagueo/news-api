/** @module database/init */

import * as logger from '../logger';
import { makeQuery } from "./makeQuery";

/**
 * Creates every database and tables needed for the api
*/ 
export async function init() {
    try {
        await makeQuery('CREATE DATABASE IF NOT EXISTS beaverApi;');
        await makeQuery(`CREATE TABLE IF NOT EXISTS beaverApi.users (
            \`id\` INT NOT NULL AUTO_INCREMENT,
            \`username\` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            \`password\` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            \`role\` VARCHAR(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'member',
            \`creationDate\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`, \`username\`)
        );`);
        await makeQuery(`CREATE TABLE IF NOT EXISTS beaverApi.news (
            \`id\` INT NOT NULL AUTO_INCREMENT,
            \`title\` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            \`content\` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            \`date\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            \`author\` VARCHAR(255) NOT NULL,
            \`likes\` INT NOT NULL DEFAULT 0,
            PRIMARY KEY (\`id\`)
        );`);
        await makeQuery(`CREATE TABLE IF NOT EXISTS beaverApi.comments (
            \`id\` INT NOT NULL AUTO_INCREMENT,
            \`content\` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            \`date\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            \`author\` VARCHAR(255) NOT NULL,
            \`newsId\` INT NOT NULL,
            PRIMARY KEY (\`id\`)
        );`);
    } catch (error) {
        logger.log("Database -> Init", "Error when creating the tables :", 'error');
        console.error(error);
    }
}
