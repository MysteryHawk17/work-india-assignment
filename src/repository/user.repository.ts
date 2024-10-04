import { PrismaClient } from "@prisma/client";
import { UserCreate, UserDelete, UserGet, UserLogin, UserUpdate } from "../dto/user.dt";


const prisma = new PrismaClient();


// create user
export const createUser = async (data: UserCreate) => {
  return await prisma.user.create({
    data,
  });
};

// get all users
export const getUsers = async () => {
  return await prisma.user.findMany();
};

// get user by id
export const getUser = async (data:UserGet) => {
  return await prisma.user.findUnique({
    where: {
      id:data.id,
    },
  });
};

//get user by username
export const getUserByUsername = async (data: UserLogin) => {
  return await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });
};
// update user
export const updateUser = async (data: UserUpdate) => {
  return await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      username: data.username,
      password: data.password,
    },
  });
};

//delete user
export const deleteUser = async (data: UserDelete) => {
  return await prisma.user.delete({
    where: {
      id: data.id,
    },
  });
};

