export interface UsersManagmentProps{
    counterName? : String;
}

export interface UsersManagmentState{
    counter: number;
    users:any[];
}

export interface userData{
    id : number;
    email : string;
    first_name : string;
    last_name : string;
    avatar : string;
}

export interface userDataAPI{
    data : userData;
}