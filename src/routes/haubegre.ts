
import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { AddHauberge, DeleteHauberge, getAllHauberges, getALLResidents, getAvalaibleHauberges, GetCurrentResidents, UpdateHauberge } from "../services/HaubergeServices";
import StatusCode from "../enums/statusCode.enum";
import { IsAuthorizedAdmin } from "../middlwares/auth";

export const router = Router();

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
router.get('/Resident/:id',async(req,res)=>{
  const id=req.params.id;
  const output=await GetCurrentResidents(id); 
  res.status(output.Status).send(output.data);
})
router.get('/Available/:startDate',async(req,res)=>{
  const output=await getAvalaibleHauberges(new Date(req.params.startDate)); 
  res.status(output.Status).send(output.data);
})
router.get('/Residents', async (req,res):Promise<any> =>{
  const output = await getALLResidents();
  if (!output || output.Status !== StatusCode.OK) {
    return res.status(StatusCode.BAD_REQUEST).send('Bad Request');
  }
  res.status(output.Status).send(output.data);
})
