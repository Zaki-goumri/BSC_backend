import {Router} from "express";
import { login, register} from "../services/admin";
import { loginUser, registerUser } from "../services/userServices";

export const authRouter=Router();
authRouter.post('/admin/login',async(req,res)=>{
  const output=await login(req.body.userName,req.body.password);
  res.status(output.Status).send(output.data);
}

)
authRouter.post('/admin/register',async(req,res)=>{
  const output=await register(req.body);
  res.status(output.Status).send(output.data);
})

authRouter.post('/user/login',async(req,res)=>{ 

  const output=await loginUser(req.body.email,req.body.password);
  res.status(output.Status).send(output.data);
}
)

authRouter.post('/user/register',async(req,res)=>{
  const user=req.body
  console.log(user)
  const output=await registerUser(user);
  res.status(output.Status).send(output.data);
}
)



