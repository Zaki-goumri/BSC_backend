import { NextFunction, Request, Response } from "express";
import { checkToken } from "../services/admin";

export async function IsAuthorizedAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization; 
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
