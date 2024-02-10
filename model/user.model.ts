export interface IUser
{
    _id?:string,
    fname:string;
    lname:string;
    mname:string;
    email:string;
    password:string;
    
    dob:Date;
    photo:string;
    mobile:Number;
    gender:string;
    isDelete:Boolean;
    role:string;
    resetToken:string;
    
}