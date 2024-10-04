import { UserRole } from "@prisma/client";

export interface User {
    id: number;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserCreateInput{
    username: string;
    password: string;
    role: string;
}
export interface UserCreate{
    username: string;
    password: string;
    role: UserRole;
}
export interface UserLogin{
    username: string;
    password: string;
}
export interface UserLoginResponse{
    token: string;
}
export interface UserResponse{
    id: number;
    username: string;
    role: string;
}
export interface UserUpdate{
    id: number;
    username: string;
    password: string;
}
export interface UserUpdateResponse{
    id: number;
    username: string;
    role: string;
}
export interface UserDelete{
    id: number;
}
export interface UserDeleteResponse{
    id: number;
}
export interface UserGet{
    id: number;
}
export interface UserGetResponse{
    id: number;
    username: string;
    role: string;
}

