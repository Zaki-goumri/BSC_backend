import StatusCode from "../enums/statusCode.enum";
import { HaubergeModel,  IHauberge } from "../models/Hauberge";
import  { ReservationModel } from "../models/reservation";


interface optionalHauberge extends Partial<IHauberge> {} 
export async function getAllHauberges(){
  try{
   const Hauberges:IHauberge[]=await HaubergeModel.find();
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
export async  function GetCurrentResidents(Id:string){
   try{ 
    const currentResident=await ReservationModel.find({HaubergeId:Id,Status:"Active"});  
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

