import * as express from 'express';
import * as token from '../modules/token';

import get from "../controllers/news/get";
import like from "../controllers/news/like";
import count from "../controllers/news/count";
import fetch from "../controllers/news/fetch";
import create from "../controllers/news/create";
import ndelete from "../controllers/news/delete";
import comment from "../controllers/news/comment/comment";
import cdelete from "../controllers/news/comment/delete";
import summaries from "../controllers/news/summaries";
import fetchall from "../controllers/news/fetchall";

const router = express.Router()

router.get("/count", count)

router.get("/fetch", fetch)

router.get("/get", get)

router.get("/summaries", summaries)

router.get("/fetchall", fetchall)

router.post("/like", token.check, like)

router.post("/create", token.check, create)

router.post("/delete", token.check, ndelete)

router.post("/comment", token.check, comment)

router.post("/comment/delete", token.check, cdelete)

export default router;