
import { Router } from "express";
import { AddHauberge, DeleteHauberge, getAllHauberges, UpdateHauberge } from "../services/HaubergeServices";
import StatusCode from "../enums/statusCode.enum";

export const router=Router();
router.get('/',async(req,res)=>{
 const output=await getAllHauberges();
  res.status(output.Status).send(output.data);
})
router.post('/',async(req,res)=>{
  try{

  const hauberge=req.body;
    const output=await AddHauberge(hauberge);
    res.status(output.Status).send(output.data);
  }catch(e){
    res.status(StatusCode.BAD_REQUEST).send('Bad Request');
  }
})

router.put('/:id',async(req,res)=>{
  const id=req.params.id;
  const hauberge=req.body;
  const output=await UpdateHauberge(id,hauberge);
  res.status(output.Status).send(output.data);
})

router.delete('/:id',async(req,res)=>{
  const id=req.params.id;
  const output=await DeleteHauberge(id);
  res.status(output.Status).send(output.data);
})
