import mongoose,{Schema} from "mongoose";

export interface IReservation {
        user_id: String,
        age: Number,
        sex: "male" | "female",
        parent_ID: String,
        hauberge: String,
        room_number: String,
        check_in: Date,
        check_out: Date,
        nature_reservation:"Gratuit"| "Payant"| "Restauration",
        restauration: Number,
        status:"en attente"|"residé"|"terminé",
       }

const ReservationSchema = new Schema({
    user_id: {type: String, required: true},
    age: {type: Number, required: true},
    parent_ID: {type: String},
    room_number: {type: String, required: true},
    check_in: {type: Date, required: true},
    check_out: {type: Date, required: true},
    nature_reservation: {type: String,enum:["Gratuit","Payant", "Restauration"], required: true},
    restauration: {type: Number ,default:0},
    status: {type: String, required: true},
    hauberge: {type: String, required: true},
    sex: {type: String, enum:["male","female"],required: true}
});

export const ReservationModel = mongoose.model<IReservation>("Reservation", ReservationSchema);