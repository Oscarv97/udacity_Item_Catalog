import { IIventoryItem } from "./IInventoryItem";

export interface IUser {
    name: string;
    id: number;
    email: string;
    personalInventory?: IIventoryItem[];
}