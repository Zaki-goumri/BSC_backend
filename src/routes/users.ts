import { Router } from "express";
import { getAllUsers } from "../services/userServices";
import { IsAuthorizedAdmin } from "../middlwares/auth";

export const userRouter=Router();
userRouter.get('/all',IsAuthorizedAdmin,async(req,res)=>{
 
 const output=await getAllUsers();
  res.status(output.Status).send(output.data);
})

