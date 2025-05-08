import { Document } from "mongoose";
import { User } from "./user.interface";

export interface Product extends Document{
    title:string;
    description:string;
    image:string;
    price:string;
    amount:number;
    owner:User;
}