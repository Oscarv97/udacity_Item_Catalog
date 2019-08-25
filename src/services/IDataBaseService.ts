import { IInventoryItem } from "./IInventoryItem";

export interface IDataBaseService { 
    getAll(): Promise<IInventoryItem[]>;
    getItem(itemId: string, catagoryId: string): Promise<any>;
    deleteItem(itemId: number): Promise<any>;
    updateItem(item: IInventoryItem): Promise<any>;
    createItem(item: IInventoryItem): Promise<any>;
}