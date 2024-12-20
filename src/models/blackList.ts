import {  model, Schema } from "mongoose";

export interface IBlackList extends Document{
  userId:string,
  Reason:string,
  Hobberge:string,
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
  },
  Facilty:{
    type:String,
    required:true
  }
})
export const blackListModel=model<IBlackList>("BlackList",blackListSchema)
