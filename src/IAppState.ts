import { IIventoryItem } from "~services/IInventoryItem";
import { IUser } from "~services/IUser";

export interface IAppState {
    inventoryItems : IIventoryItem[];
    selectedItem: IIventoryItem;
    selectedCategory: string;
    isLoggedIn : boolean;
    currentUser: IUser;
    
}