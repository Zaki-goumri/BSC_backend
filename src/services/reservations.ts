import { ReservationModel } from "../models/reservation";

export const getReservations = async () => {
    return await ReservationModel.find();
}