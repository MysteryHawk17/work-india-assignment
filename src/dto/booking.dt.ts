import { BookingStatus } from "@prisma/client"

export interface BookingInput{
    userId:number
    trainId:number
}

export interface BookingCreate{
    userId:number
    trainId:number
    status:BookingStatus
}