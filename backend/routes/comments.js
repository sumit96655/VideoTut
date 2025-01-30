import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comment.js";
import {verifyToken} from "../verifyToken.js"
import { createError } from "../error.js";

const router = express.Router();

//add comment
router.post("/",verifyToken,addComment)
//delete comment
router.delete("/:id",verifyToken,deleteComment)
//get comments for videos
router.get("/:videoId",getComments)

export default router;

