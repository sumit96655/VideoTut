import { createError } from "../error.js"
import User from "../models/User.js";
import mongoose, { get } from "mongoose";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
   const userId = req.params.id;

   // Check if the provided ID is a valid ObjectId
   if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(createError(400, "Not a valid account logged in!"));
   }

   if (userId === req.user.id) {
      try {

         const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
         }, {
            new: true
         });
         res.status(200).json(updatedUser);
      } catch (err) {
         next(err)
      }
   } else {
      return next(createError(403, "You can update only your account."));
   }
}
export const deleteUser = async (req, res, next) => {
   const userId = req.params.id;

   // Check if the provided ID is a valid ObjectId
   if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(createError(400, "Invalid user ID format"));
   }

   if (userId === req.user.id) {
      try {
         await User.findByIdAndDelete(req.params.id);
         res.status(200).json("User has been deleted");
      } catch (err) {
         next(err)
      }
   } else {
      return next(createError(403, "You can delete only your account."));
   }
}
export const getUser = async (req, res, next) => {
   try{
      const user= await User.findById(req.params.id);
      res.status(200).json(user);
   }catch(err){
      next(err);
   }
}
export const subscribe =async (req, res, next) => {
   try{
      await User.findByIdAndUpdate(req.user.id,{
         $push:{subscribedUsers:req.params.id}
      });
      await User.findByIdAndUpdate(req.params.id,{
         $inc:{subscribers:1}
      });
      res.status(200).json("Subscribed.")
   }catch(err){
      next(err);
   }
}
export const unsubscribe =async (req, res, next) => {
   try{
      await User.findByIdAndUpdate(req.user.id,{
         $pull:{subscribedUsers:req.params.id}
      });
      await User.findByIdAndUpdate(req.params.id,{
         $inc:{subscribers:-1}
      });
      res.status(200).json("Unsubscribed.")
   }catch(err){
      next(err);
   }
}
export const like =async (req, res, next) => {
   const id =req.user.id;
   const videoId=req.params.videoId;
   try{
      await Video.findByIdAndUpdate(videoId,{
         $addToSet:{likes:id},
         $pull:{dislikes:id}
      })
      res.status(200).json("Liked this video!");
   }catch(err){
      next(err);
   }
}
export const dislike =async (req, res, next) => {
   const id =req.user.id;
   const videoId=req.params.videoId;
   try{
      await Video.findByIdAndUpdate(videoId,{
         $addToSet:{dislikes:id},
         $pull:{likes:id}
      })
      res.status(200).json("disLiked this video!");
   }catch(err){
      next(err);
   }
}