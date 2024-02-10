import { IUser } from "./user.model";
export default interface IProfile{
    _id?:string,
    dob:Date;
    address:string;
    blood_group:string;
    education:string;
    marital_status:string;
    native_address:string;
    maternal_village:string;
    maternal_surname:string;
    user:IUser;
    isDelete:boolean;
    

}

