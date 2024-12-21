import StatusCode from "../enums/statusCode.enum";
import { IUser, userModel } from "../models/userModel";

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
//Here the auth is Implemented Using a fixed token stored in the db Which is not very secure due to the short time 
//In the normal case we should use jwt tokens with a refresh and access token that gets stored on the client side on a secure Storage eg:(cookies ,Flutter Secure Storage ..etc)
export async function loginUser(email: string, password: string) {
    try {
        const user = await userModel.findOne({Email: email });
        if (user == null) {
            return {
                data: "User not found",
                Status: StatusCode.NOT_FOUND
            };
        };
    //Here we compare the password with the hashed password stored in the db
    if (!await bcrypt.compare(password, user.Password)) {
     return {
        data: "Incorrect Password",
        Status: StatusCode.UNAUTHORIZED
      }
    }
    return {
      data: user,
      Status: StatusCode.OK}
     
    } catch (e) {
    console.log(e)
    return {
      data: e,
      Status: StatusCode.INTERNAL_SERVER_ERROR
    }
    
     
  }
}

export async function registerUser(user: IUser) {
  try {
    const dbUser = await userModel.findOne({ email: user.Email });
    //Generate the token which should be a jwt not a uuid
    const uuid=uuidv4();
   user.Token=uuid;
    if (dbUser != null) {
      return {
        data: "User already exists",
        Status: StatusCode.BAD_REQUEST
      }}
    //Hashin the password Irreversably
    const hash = await bcrypt.hash(user.Password,10);
    user.Password = hash;
    const model = new userModel(user);
    const output = await model.save();
    return {
      data: output,
      Status: StatusCode.CREATED
    }
  } catch (error) {
    console.log(error)
    return {
      data: error,
      Status: StatusCode.INTERNAL_SERVER_ERROR
    }
  }
}
//Get all of the users currently using the app as a client for analytics ... etc
export async function getAllUsers() {
  try {
    const users: IUser[] = await userModel.find();
    return {
      data: users,
      Status: StatusCode.OK
    }
  } catch (e) {
    return {
      data: [],
      Status: StatusCode.INTERNAL_SERVER_ERROR,
    }
  }
}
//Simple token Validation
export async function checkToken(token: String) {
  try {
    const user = await userModel.findOne({ token: token });
    if (user == null) {
      false
    }
    return true
  } catch (error) {
    return false
  }
}
export async function DelAccount(id:String){
 try{
  await userModel.findOneAndDelete({cardId:id})
    return {
    StatusCode:StatusCode.OK,
    data:"Deleted Succefuly"
    }
  }catch(e){
    return {
      StatusCode:StatusCode.INTERNAL_SERVER_ERROR,
      data:e
    }
  }
}
export async function updateUser(id:String,user:IUser){
  try{
   const newUser= await userModel.findOneAndUpdate({cardId:id},user)
    return {
      StatusCode:StatusCode.OK,
      data:newUser
    }

    }catch(e){
    return {
      StatusCode:StatusCode.INTERNAL_SERVER_ERROR,
      data:e
    }

}}
