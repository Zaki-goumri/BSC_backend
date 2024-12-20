import StatusCode from "../enums/statusCode.enum";
import { blackListModel } from "../models/blackList";
import { IUser, userModel } from "../models/userModel";

export async function addToBlackList(userId:string,Reason:string,hobberge:String){
  const newBan=new blackListModel({
    userId:userId,
    Reason:Reason,
    Facility:hobberge
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
     for (const preson of blackList) {
      const user = await userModel.findOne({cartId: preson.userId});
      if (user) {
        preson.firstName = user.FirstName;
        preson.lastName = user.LastName;
      }
     }
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

