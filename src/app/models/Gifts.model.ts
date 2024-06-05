import { Donors } from "./Donor.model";
import { User } from "./User.model";

export class Gifts
{
    id!: number;
    name!: string;
    donor!: Donors; 
    price!: number;
    customers!:User[];
    img!:string;
    IsRandom:boolean=false;
}