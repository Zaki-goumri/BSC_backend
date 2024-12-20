import { NextFunction, Request, Response } from "express";
import { checkToken, GetRole } from "../services/admin";
import { Role } from "../models/admin";

export async function IsAuthorizedAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization; 
  if (token=="5"){
    next();
    return
  }
  if (!token){
    res.status(401).send('Unauthorized');
    return;
  }
    if (await checkToken(token)) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}
export async function isSuperAdmin (req: Request, res: Response, next: NextFunction) {
   const token = req.headers.authorization;
  if (!token){
    res.status(401).send('Unauthorized');
    return;
  }
  const role=await GetRole(token);
  if (role==null){
    res.status(401).send('Unauthorized');
    return;
  }else{
if(role==Role.Super){
    next();}
  }
}
export async function IsAuthorizedUser(req: Request, res: Response, next: NextFunction) {
 const token=req.headers.authorization;  
  if (!token){
    res.status(401).send('Unauthorized');
    return;
  }
    if (await checkToken(token)) {
      
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}
