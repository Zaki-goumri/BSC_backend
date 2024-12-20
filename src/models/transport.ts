import mongoose, { Schema, Document } from "mongoose";

interface Itransport extends Document{
  way:string,
  station:String ,
  start_time:Date,
  end_time: Date, 
  
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
})

export default mongoose.model<Itransport>("Transport",transportSchema );