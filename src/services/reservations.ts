import { ReservationModel } from "../models/reservation";
import { IReservation } from "../models/reservation";
import StatusCode from "../enums/statusCode.enum";
import { HaubergeModel, IHauberge } from "../models/Hauberge";
import { isBlackListed } from "./blackListService";


interface IUpdateReservation extends IReservation {
    _id: string;
}



export const getReservations = async () => {
    const reservations = await ReservationModel.find();
    if (!reservations) {
        return {statusbar:StatusCode.NOT_FOUND, message:"No reservations found"};
    }
    return {statusbar:StatusCode.OK, message:reservations};
}


const checkReservation = async (reservation:IUpdateReservation) => {

    const checkReservation = await ReservationModel.findById(reservation._id);
  if (!checkReservation) {
    return {statusbar:StatusCode.NOT_FOUND, message:"Reservation not found"};
  }
    if (reservation.check_in > reservation.check_out) {
        return {statusbar:StatusCode.BAD_REQUEST, message:"Check in date must be before check out date"};
    }
    if (Number(reservation.age) < 19 && !reservation.parent_ID) {
        return {statusbar:StatusCode.BAD_REQUEST, message:"you are not allowed to reserve without a parent ID"};
    }
  
} 

const checkHauberge = async (hauberge:IHauberge) => {
    if (!hauberge) {
        return {statusbar:StatusCode.BAD_REQUEST, message:"Hauberge not found"};
    }
    if (hauberge.PersonReservedNbr >= hauberge.capacity) {
        return {statusbar:StatusCode.BAD_REQUEST, message:"Hauberge is full"};
    }
    return {statusbar:StatusCode.OK, message:"Hauberge is available"};
}



export const addReservation = async (reservation:IUpdateReservation) => {
   try {
    if (await isBlackListed(reservation.user_id as string)) {   
      return {
        statusbar:StatusCode.BAD_REQUEST,
        message:"User is blacklisted"
      }
    }
    
    
    if (reservation.check_in > reservation.check_out) {
        return {statusbar:StatusCode.BAD_REQUEST, message:"Check in date must be before check out date"};
    }
    if (Number(reservation.age) < 19 && !reservation.parent_ID) {
        return {statusbar:StatusCode.BAD_REQUEST, message:"you are not allowed to reserve without a parent ID"};
    }

    const Hauberge = await HaubergeModel.findById(reservation.haubergeId);
    if (!Hauberge) {
        return {statusbar:StatusCode.BAD_REQUEST, message:"Hauberge not found"};
    }
    const haubergeCheck = await checkHauberge(Hauberge);
    if (!haubergeCheck || haubergeCheck.statusbar !== StatusCode.OK) {
        return haubergeCheck;
    }
    const newReservation = new ReservationModel(reservation);
    await newReservation.save();
    Hauberge.PersonReservedNbr += 1;
    const dbRes=await Hauberge.save();
    return {statusbar:StatusCode.CREATED, message:dbRes};
   } catch (error) {

    return {statusbar:StatusCode.INTERNAL_SERVER_ERROR, message:error};
    
   }
}



export const updateReservation = async (reservation:IUpdateReservation) => {
   try { 
    const reservationToUpdate = await ReservationModel.findById(reservation._id);
    if (!reservationToUpdate) {
        return {statusbar:StatusCode.NOT_FOUND, message:"Reservation not found"};
    }
    const check = await checkReservation(reservation);
    if (!check || check.statusbar !== StatusCode.OK) {
        return check;
    }
    const Hauberge = await HaubergeModel.findById(reservation.haubergeId);
    if (!Hauberge) {
        return {statusbar:StatusCode.BAD_REQUEST, message:"Hauberge not found"};
    }
    const haubergeCheck = await checkHauberge(Hauberge);
    if (!haubergeCheck || haubergeCheck.statusbar !== StatusCode.OK) {
        return haubergeCheck;
    }
    await ReservationModel.findByIdAndUpdate(reservation._id, reservation);
    return {statusbar:StatusCode.OK, message:"Reservation updated successfully"};

   } catch (error) {
    
   }
}

export const deleteReservation = async (id:string) => {
    try {
        const reservationToDelete = await ReservationModel.findById(id);
         const haugergeToUpdate=await HaubergeModel.findById(reservationToDelete?.haubergeId)
        if (!reservationToDelete) {
            return {statusbar:StatusCode.NOT_FOUND, message:"Reservation not found"};
                }        
                if (reservationToDelete.status !== "en attente") {
                    return {statusbar:StatusCode.BAD_REQUEST, message:"Cannot delete a reservation that has already been checked in"};
                }
                await ReservationModel.findByIdAndDelete(id);
                  if (haugergeToUpdate==null){
      return {statusbar:StatusCode.BAD_GATEWAY,message:"Hauberge Gone"}
    }else {

                haugergeToUpdate.PersonReservedNbr-=1 
    }
                await haugergeToUpdate.save()
                return {statusbar:StatusCode.OK, message:"Reservation deleted successfully"};
            
            }catch (error) {
                return {statusbar:StatusCode.INTERNAL_SERVER_ERROR, message:"Internal server error"};
            }
        }



export const checkInReservation = async (id:string) => {
    try {
        const reservationToCheckIn = await ReservationModel.findById(id);
        if (!reservationToCheckIn) {
            return {statusbar:StatusCode.NOT_FOUND, message:"Reservation not found"};
        }
        if (reservationToCheckIn.status !== "en attente") {
            return {statusbar:StatusCode.BAD_REQUEST, message:"Reservation has already been checked in"};
        }
        let currentDate = new Date()
        if ( currentDate !== reservationToCheckIn.check_in) {
            return {statusbar:StatusCode.BAD_REQUEST, message:"Cannot check in before check in date"};
        }
        reservationToCheckIn.status = "residé";
        await reservationToCheckIn.save();
        return {statusbar:StatusCode.OK, message:"Reservation checked in successfully"};
    } catch (error) {
        return {statusbar:StatusCode.INTERNAL_SERVER_ERROR, message:"Internal server error"};
    }
}


