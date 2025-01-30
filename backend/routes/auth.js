import express from "express";
import { signin, signup } from "../controllers/auth.js";

const router = express.Router();

//signup
router.post("/signup", signup)
//signin
router.post("/signin", signin)
//google auth
// router.post("/signup",)

export default router;

