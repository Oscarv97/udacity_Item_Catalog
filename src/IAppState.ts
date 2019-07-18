import { IIventoryItem } from "~services/IInventoryItem";

export interface IAppState {
    inventoryItems : IIventoryItem[];
    selectedItem: IIventoryItem;
    selectedCategory: string;
    
}