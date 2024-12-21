import { get } from "mongoose";
import StatusCode from "../enums/statusCode.enum";
import { HaubergeModel,  IHauberge } from "../models/Hauberge";
import  { ReservationModel } from "../models/reservation";
import {IUser, userModel} from "../models/userModel";


interface optionalHauberge extends Partial<IHauberge> {} 

export async function getAllHauberges(){
  try{
   const Hauberges:IHauberge[]=await HaubergeModel.find();
    console.log('Responed with'+Hauberges)
    return {
      data:Hauberges,
      Status:StatusCode.OK
    }
  }catch(e){
  return {
    data:[],
    Status:StatusCode.INTERNAL_SERVER_ERROR,
    }
  }
}

export async function getHaubegeById(id:string){
  try {
   const Hauberge:IHauberge|null=await HaubergeModel.findById(id);
    if (Hauberge==null){
      return {
        data:Hauberge,
        Status:StatusCode.NOT_FOUND,
      }
    }
  } catch (error) {
   console.log(error) 
    return{
      data:error,
      Status:StatusCode.INTERNAL_SERVER_ERROR
    }
  }
}
export async function AddHauberge(Hauberge:IHauberge){
  try {
    const model=new HaubergeModel(Hauberge);
    const output=await model.save({})
    return {
      data:output,
      Status:StatusCode.CREATED
    }
  } catch (error) {
   return {
      data:error,
      Status:StatusCode.INTERNAL_SERVER_ERROR
    } 
  }
}
export async function DeleteHauberge(Id:String){
  try {
    await HaubergeModel.findByIdAndDelete(Id);
    return {
      data:"Deleted Succefuly",
      Status:StatusCode.OK
    }
  } catch (error) {
    return {
      data:error,
      Status:StatusCode.INTERNAL_SERVER_ERROR
  } 
}}
export async function UpdateHauberge(Id:string,Hauberge:optionalHauberge){
  try {
    await HaubergeModel.findByIdAndUpdate(Id,Hauberge);
    return {
      data:"Updated Succefuly",
      Status:StatusCode.OK
    }
} catch (error) {
  return {
    data:error,
    Status:StatusCode.INTERNAL_SERVER_ERROR
  }}}

  export interface IReservation {

    _id: string;
  
    HaubergeId: string;
  
    user_id: string;
  
    Status: string;
  
    user: IUser | null; 
  
  }
  

export async  function GetCurrentResidents(Id:string){
   try{ 

    const currentResident:IReservation[] =await ReservationModel.find({HaubergeId:Id,Status:"residé"});  
 
    return {
      data:currentResident,
      Status:StatusCode.OK
    }
  }catch(e){
    return {
      data:e,
      Status:StatusCode.INTERNAL_SERVER_ERROR
    }
  }
}
export async function getAvalaibleHauberges(startDate:Date){
  
  try{
    console.log('I am the controller')
    const avalaibleHauberges=await HaubergeModel.find({avalaiblity:true});
    const available = await Promise.all(
  avalaibleHauberges.map(async (elem) => {
    const isAvailable = elem.PersonReservedNbr < elem.capacity || 
                        (await ReservationModel.countDocuments({
                          haubergeId: elem._id,
                          check_out: { $lte: startDate },
                        }) > 0);
    return isAvailable ? elem : null;  // Keep only available hauberges
  })

);
// Filter out null values
const filteredAvailable = available.filter((elem) => elem !== null);    
    return {
      data:filteredAvailable,
      Status:StatusCode.OK
    }
  }catch(e){
    return {
      data:e,
      Status:StatusCode.INTERNAL_SERVER_ERROR
    }
  }
}

      export async function getALLResidents() {
  try{ 
    let result = [];
    const currentResident = await ReservationModel.find({status:"residé"});  
    for (const resident of currentResident) {
     const user = await userModel.find({cardId:resident.user_id})
     if (user){ 
      result.push(user) 
     }
    }
    return {
      data:result.flat( ),
      Status:StatusCode.OK
    }
  }catch(e){
    return {
      data:e,
      Status:StatusCode.INTERNAL_SERVER_ERROR
    }
  }
}
