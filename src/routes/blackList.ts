import { Router } from "express";
import { addToBlackList, getBlackList, removeFromBlackList } from "../services/blackListService";



export const BlackListRouter=Router(); 
BlackListRouter.get('/',async(req,res)=>{
  const output= await getBlackList();
  res.status(output.Status).send(output.data);
})


BlackListRouter.post('/',async(req,res)=>{
  const output=await addToBlackList(req.body.userId,req.body.Reason,req.body.Facility);
  res.status(output.Status).send(output.data);
})
BlackListRouter.delete('/',async(req,res)=>{
  const output=await removeFromBlackList(req.body.userId);
  res.status(output.Status).send(output.data);
})

