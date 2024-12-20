
import { model, Model,  Schema } from "mongoose";


export interface IBlackList extends Document{
  userId:string,
  Reason:string,
  Hobberge:string,
  Date:Date,
  firstName:string,
  lastName:string

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
  Hobberge:{
    type:String,
    required:true
  },
  firstName:{
    type:String,
    required:false
  },
  lastName:{
    type:String,
    required:false
  }
})
export const blackListModel= model("BlackList",blackListSchema)