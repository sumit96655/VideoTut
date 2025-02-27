import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res,next) => {
    try {
        // const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const myPlaintextPassword = req.body.password;
        const someOtherPlaintextPassword = 'not_bacon';

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(myPlaintextPassword, salt);

        const newUser = new User({ ...req.body, password:hash})

        await newUser.save();        
        res.status(200).send("User created successfully");
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res,next) => {
    try {
        const user = await User.findOne({name:req.body.name});
        if(!user) return next(createError(404,"User not found!"))

        const isCorrect =bcrypt.compareSync(req.body.password, user.password);

        if(!isCorrect) return next(createError(400,"Wrong credentials"));

        const token=jwt.sign({id:user._id},process.env.JWT);
        
        const {password,...others}=user._doc;

        res.cookie("access_token", token,{
            httpOnly:true,
        }).status(200).json(others)

    } catch (err) {
        next(err);
    }
};