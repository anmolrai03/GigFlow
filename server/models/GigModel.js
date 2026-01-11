// ● Gig: title, description, budget, ownerId, status (open or assigned).

import mongoose from "mongoose";

const  gigSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  } ,
  description:{
    type: String,
  } ,
  budget:{
    type: Number,
    required: true
  },
  ownerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  } ,

  status:{
    type: String,
    enum: ['open' , 'assigned'],
    default: 'open'
  }
}, {timestamps: true})

const Gig = mongoose.model("Gig", gigSchema);

export default Gig;