import { model, Schema } from "mongoose";
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
    type:Number,
    required:true,
  },
  Sex:{
    type:String,
    required:true
  },
}) ;
export interface IUser{
  FirstName:string,
  LastName:string,
  Email:string,
  Password:string,
  Phone:number,
  DateOfBirth:Date,
  PlaceofBirth:string,
  cardId:number,
}
export const userModel=model('User',userSchema);
