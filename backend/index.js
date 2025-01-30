import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app=express();
const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
dotenv.config()

const connect=()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("connected to  Mongodb");
    }).catch((err)=>{
        throw err;
    });
}

app.use(cookieParser())
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.use((err,req,res,next)=>{
    const status =err.status || 500;
    const message =err.message || "something went wrong";
    return res.status(status).json({
        success:false,
        status:status,
        message:message
    })
})

app.listen(8800, ()=>{
    connect();
    console.log("server connected at 8800");    
})