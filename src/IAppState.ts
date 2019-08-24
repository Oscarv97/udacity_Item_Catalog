import { IInventoryItem } from "~services/IInventoryItem";

export interface IAppState {
    inventoryItems : IInventoryItem[];
    selectedItem: IInventoryItem;
    selectedCategory: string;
    isLoggedIn : boolean;
    currentUser: firebase.User;
    
}