import { log } from '.';
import { Request, Response, NextFunction } from "express";

/** @module logger/httpLog */

/**
  * Express middleware to log every http request made to the Express server
  * @param {Request} req Express Request
  * @param {Response} res Express response
  * @param {NextFunction} next Express next function
  */
export function httpLog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress
  log(`[HTTPS]`, `${ip} --> ${req.method} ${req.originalUrl}`, "http");
  res.on("finish", () => {
    log(`[HTTPS]`, `${ip} <-- ${res.statusCode}: ${res.statusMessage}\n${res.get("Content-Length") || 0}b sent`,"http");
  });
  next();
}
