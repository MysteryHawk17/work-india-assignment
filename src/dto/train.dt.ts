export interface TrainCreateInput {
    name:string;
    source:string;
    destination:string;
    totalSeats:number;
    departureTime:string;
}
export interface TrainCreate{
    name:string;
    source:string;
    destination:string;
    totalSeats:number;
    availableSeats:number;
    departureTime:Date;
}
export interface TrainUpdateInput {
    name:string;
    source:string;
    destination:string;
    totalSeats:number;
    departureTime:string;
}

export interface TrainUpdate {
    name:string;
    source:string;
    destination:string;
    totalSeats:number;
    availableSeats:number;
    departureTime:Date;
}
export interface TrainDelete{
    id:number;
}

export interface betweenStations{
    source:string;
    destination:string;
}