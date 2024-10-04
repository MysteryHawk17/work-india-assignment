import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserCreateInput, UserLogin } from "../dto/user.dt";
import { createUserService, userLoginService } from "../services/user.services";

const prisma = new PrismaClient();

// create user
export const userController = async (req: Request, res: Response) => {
  try {
    const data = <UserCreateInput>req.body;
    const createdUser = await createUserService(data);
    res
      .status(201)
      .json({ message: "User created successfully", user: createdUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// login user

export const userLoginController = async (req: Request, res: Response) => {
  try {
    const data = <UserLogin>req.body;
    const loginUser = await userLoginService(data);
    res
      .status(200)
      .json({ message: "User Login successfully", user: loginUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

