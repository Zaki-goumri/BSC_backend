import { Router } from "express";
import { handlePrompt } from "../services/aiServices";

//Single Route for handling Ai request
export const gemRouter=Router()
gemRouter.post('/',async(req,res)=>{
  console.log(req.body)
  const prompt=req.body.prompt;
  const output=await handlePrompt(prompt)
  res.status(output.StatusCode).send(output.data);
})
