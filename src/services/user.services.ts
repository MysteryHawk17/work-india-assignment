import bcrypt from "bcryptjs";
//create user service

import { UserCreateInput, UserLogin } from "../dto/user.dt";
import { createUser, getUserByUsername } from "../repository/user.repository";
import { UserRole } from "@prisma/client";
import { generateAccessToken } from "../utils/auth.util";

export const createUserService=async(data:UserCreateInput)=>{
    const findUserByUsername=await getUserByUsername(data);
    if(findUserByUsername){
        throw new Error("User already exists");
    }
    const password=data.password;
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    let enumRole;
    switch(data.role){
        case "ADMIN":
            enumRole=UserRole.ADMIN;
            break;
        case "USER":
            enumRole=UserRole.USER;
            break;
        default:
            throw new Error("Invalid role");
    }

    const createdUser=await createUser({
        username:data.username,
        password:hashedPassword,
        role:enumRole
    })
    if(!createdUser){
        throw new Error("User not created");
    }

}

//login user 
export const userLoginService=async(data:UserLogin)=>{
    const findUser=await getUserByUsername(data);
    if(!findUser){
        throw new Error("User not found");
    }
    const isMatch=await bcrypt.compare(data.password,findUser.password);
    if(!isMatch){
        throw new Error("Invalid password");
    }
    const user={
        id:findUser.id,
        username:findUser.username,
        role:findUser.role
    }
    const jwtToken=generateAccessToken(user);

    return {token:jwtToken,user:user};
}
