import {Document, Schema, model} from 'mongoose';

export interface Iemploye extends Document{
  FirstName:string,
  LastName:string,
  DateOfBirth:Date,
  PlaceofBirth:string,
  Rank:String,
  Job:string,
}
const employeSchema=new Schema({

  FirstName:{
    type:String,
    required:true
  },
  LastName:{
    type:String,
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
  Rank:{
    type:String,
    required:true
  },
  Job:{
    type:String,
    required:true
  }
}) ;
export const employeModel = model<Iemploye>('Employe',employeSchema);
