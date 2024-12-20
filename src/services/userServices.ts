import StatusCode from "../enums/statusCode.enum";
import { IUser, userModel } from "../models/userModel";

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function login(email: string, password: string) {
    try {
        const user = await userModel.findOne({ email: email });
        if (user == null) {
            return {
                data: "User not found",
                Status: StatusCode.NOT_FOUND
            };
        };
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
    return {
      data: e,
      Status: StatusCode.INTERNAL_SERVER_ERROR
    }
    
     
  }
}

export async function register(user: IUser) {
  try {
    const dbUser = await userModel.findOne({ email: user.Email });
    const uuid=uuidv4();
   user.Token=uuid;
    if (dbUser != null) {
      return {
        data: "User already exists",
        Status: StatusCode.BAD_REQUEST
      }}
    const hash = await bcrypt.hash(user.Password, 10);
    user.Password = hash;
    const model = new userModel(user);
    const output = await model.save();
    return {
      data: output,
      Status: StatusCode.CREATED
    }
  } catch (error) {
    return {
      data: error,
      Status: StatusCode.INTERNAL_SERVER_ERROR
    }
  }
}
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
