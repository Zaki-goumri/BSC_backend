import mongoose, { Schema, Document } from "mongoose";

export interface Element {
  place: string,
  montant:number,
}

interface Itransport extends Document{
  way:string,
  station:String ,
  start_time:Date,
  end_time: Date, 
  start_station:String,
  end_station:String,
  stops:Element[],
  price:number,
  transport_type:"bus"|"train",
}

const transportSchema = new Schema<Itransport>({
  way:{
    type:String,
    require:true,
  },
  station:{
    type:String,
    require:true,
  },
start_time:{
  type:Date,
  require:true,
}  ,
end_time:{
  type:Date,
  require:true,
}
,
start_station:{
  type:String,
  require:true,
},
end_station:{
  type:String,
  require:true,
},
stops:{
  type: [{ 
    place: { type: String, required: true },
    montant: { type: Number, required: true }
  }],
  required: true,
},
price:{
  type:Number,
  require:true,
},
transport_type:{
  type:String,
  require:true,
  enum:["bus","train"],
}

})

export const TransportModel = mongoose.model<Itransport>("Transport",transportSchema );