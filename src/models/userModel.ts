import { Document, model, Schema } from "mongoose";
  const userSchema=new Schema({
    FirstName:{
      type:String,
      required:true
    },
    LastName:{
      type:String,
      required:true
    },
    Email:{
      type:String,
      required:true
    },
    Password:{
      type:String,
      required:true
    },
    Phone:{
      type:Number,
      required:true
    },
    DateOfBirth:{
      type:Date,
      required:true
    },
    PlaceofBirth:{
      type:String,
      required:true
    },
    cardId:{
      type:String,
      required:true,
    },
    Sex:{
      type:String,
      required:true
    },
  //TODO This is a temporary  auth instead of using JWT
  Token:{
    type:String,
    required:false,
  }
}) ;
export interface IUser extends Document{
  FirstName:string,
  LastName:string,
  Email:string,
  Password:string,
  Phone:string,
  DateOfBirth:Date,
  PlaceofBirth:string,
  cardId:number,
  Token:string,
}
export const userModel = model<IUser>('User',userSchema);
