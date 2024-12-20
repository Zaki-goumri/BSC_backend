import { get, now } from "mongoose";
import StatusCode from "../enums/statusCode.enum";
import { blackListModel } from "../models/blackList";
import { IUser, userModel } from "../models/userModel";

export async function addToBlackList(userId:string,Reason:string,hobberge:String){
  const newBan=new blackListModel({
    userId:userId,
    Reason:Reason,
    Hobberge:hobberge,
    Date:new Date(now())
  })
  try{
  const newBlackList= await newBan.save();
  return {
    data:newBlackList,
    Status:StatusCode.CREATED}
  }catch(e){
    return {
      data:e,
      Status:StatusCode.INTERNAL_SERVER_ERROR
    } 
  }}
export async function removeFromBlackList(userId:string){
  try{
    await blackListModel.findOneAndDelete({userId:userId});
    return {
      data:await getBlackList(),
      Status:StatusCode.OK
    }
  }catch(e){
    return {
      data:e,
      Status:StatusCode.INTERNAL_SERVER_ERROR
    }
}}
export async function getBlackList(){
   try {
     const blackList=await blackListModel.aggregate([
  {
    $addFields: {
      userIdObject: { $toObjectId: "$userId" }, // Convert userId string to ObjectId
    },
  },
  {
    $lookup: {
      from: "users",            // Name of the users collection
      localField: "userIdObject", // Converted ObjectId field
      foreignField: "_id",      // ObjectId in the users collection
      as: "UserInfo",           // Result field
    },
  },    ]);

    console.log(blackList)
     return {
       data:blackList,
       Status:StatusCode.OK
     }
   }catch(e){
    console.log(e)
     return {
       data:e,
       Status:StatusCode.INTERNAL_SERVER_ERROR
     }
   }
}
export async function isBlackListed(userId:String){
  try {
    const blackList=await blackListModel.findOne({userId:userId});
    if(blackList==null){
      return false
    }
    return true
  } catch (error) {
    return false
  }
 }

