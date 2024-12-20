import { Model, Mongoose, Schema } from "mongoose";
import { userModel } from "./userModel";

export interface IBlackList extends Document{
  userId:string,
  Reason:string,
  Date:Date,

}
export const blackListSchema=new Schema({
  userId:{
    type:String,
    required:true
  },
  Reason:{
    type:String,
    required:true
  },
  Date:{
    type:Date,
    required:true
  }
})
export const blackListModel=new Model("BlackList",blackListSchema)
