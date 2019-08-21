import { IInventoryItem } from "./IInventoryItem";

export interface IUser {
    name: string;
    id: number;
    email: string;
    personalInventory?: IInventoryItem[];
}