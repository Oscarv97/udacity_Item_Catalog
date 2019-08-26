import { IInventoryItem } from "~services/IInventoryItem";

export interface ICategoryItemsState {
    categoryItems: IInventoryItem[];
    categoryName: string;
}