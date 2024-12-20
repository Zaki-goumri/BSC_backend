import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import StatusCode from "../enums/statusCode.enum";
import dotenv from 'dotenv';
dotenv.config()
const gemini_api_key = process.env.API_KEY||"";
const googleAI = new GoogleGenerativeAI(gemini_api_key);

 
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",});
export async function handlePrompt(message:string) {
  console.log(message)
  if (!gemini_api_key){
    return {
    StatusCode:StatusCode.UNAUTHORIZED,
      data:"Unvalid APIKEY"
    }
  }
  const res=await geminiModel.generateContent(message);
const response=res.response.candidates;
  return {
    StatusCode:StatusCode.OK,
    data:response
  };
}
