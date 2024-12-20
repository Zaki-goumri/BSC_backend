import {Router} from "express";
import { login, register} from "../services/admin";

export const authRouter=Router();
authRouter.post('/admin/login',async(req,res)=>{
  const output=await login(req.body.Username,req.body.Password);
  res.status(output.Status).send(output.data);
}

)
authRouter.post('/admin/register',async(req,res)=>{
  const output=await register(req.body);
  res.status(output.Status).send(output.data);
})

authRouter.post('/user/login',async(req,res)=>{ 

  const output=await login(req.body.email,req.body.password);
  res.status(output.Status).send(output.data);
}
)
authRouter.post('/user/register',async(req,res)=>{
  const output=await register(req.body);
  res.status(output.Status).send(output.data);
}
)



