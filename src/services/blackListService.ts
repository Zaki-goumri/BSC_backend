import StatusCode from "../enums/statusCode.enum";
import { blackListModel } from "../models/blackList";

export async function addToBlackList(userId:string,Reason:string){
  const newBan=new blackListModel({
    userId:userId,
    Reason:Reason,
    Date:new Date()
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
      data:"Deleted Succefuly",
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
     const blackList=await blackListModel.find();
     return {
       data:blackList,
       Status:StatusCode.OK
     }
   }catch(e){
     return {
       data:e,
       Status:StatusCode.INTERNAL_SERVER_ERROR
     }
   }
}
export async function isBlackListed(userId:string){
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

