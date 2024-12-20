import { Document, model, Schema } from "mongoose"

export interface Iadmin extends Document{
  Username:string,
  password:string,
  Token:string,
  Role:Role
}
export enum Role{
  Super="Super Admin",
  Admin="Admin",
}
const adminSchema=new Schema({
  Username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  Role:{
    type:String,
    enum:Role,
    required:true
  },
  // //TODO This is a temporary  auth instead of using JWT
  // Token:{
  //   type:String,
  //   required:false,
  // }


})
export const adminModel= model<Iadmin>("Admin",adminSchema);
