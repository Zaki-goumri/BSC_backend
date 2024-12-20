import { Document, model, Schema } from "mongoose";



export interface IHauberge extends Document{
  type: string,
  capacity: number,
  name: string,
  location: {
    latitude: number,
    longitude: number
  },
  address: string,
  email: string,
  phone: string,
  avalaiblity:boolean,
  PersonReservedNbr:number,
  rating:number,
  prix:number,
  Offres:string[],
}




const HaubergeSchema=new Schema({
  type:{
    type: String,
    enum: ['maison','camp','Hotel'],
    required: true
  },
  capacity: {
    type: Number,
    required:true,
  },
 
  name: {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  address: {
    type: String,
    required: true
  },
  Prix:{
    type:Number,
    required:true
  },
  
  email: {
    type: String,
    required: true,
    match: /\S+@\S+\.\S+/, // Basic email validation regex
  },
  rating:{
    type:Number,
    default:0
  },
  phone: {
    type: String,
    required: true,
    match: /^\+?[0-9]{10,15}$/ // Validates international phone numbers
  },
  avalaiblity:{
    type:Boolean,
    required:true
  },
  PersonReservedNbr:{
    type:Number,
    required:true
  },
  Offres:{
  type:[String],
  required:true
},

 
});  
  
export const HaubergeModel= model<IHauberge>("Hauberge",HaubergeSchema);




