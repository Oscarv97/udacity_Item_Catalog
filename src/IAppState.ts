import { IInventoryItem } from "~services/IInventoryItem";
import { IUser } from "~services/IUser";

export interface IAppState {
    inventoryItems : IInventoryItem[];
    selectedItem: IInventoryItem;
    selectedCategory: string;
    isLoggedIn : boolean;
    currentUser: IUser;
    
}