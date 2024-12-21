import { Request } from "express";
export interface ReqUser{
  id:string;
  role:String;
}
export interface extendedReq extends Request{
  user:ReqUser
}
