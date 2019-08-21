import { IInventoryItem } from "./IInventoryItem";

export interface IDataBaseService { 
    getAll(): Promise<IInventoryItem[]>;
    getItem(itemId: string, catagoryId: string): Promise<any>;
    deleteItem(itemId: number): Promise<any>;
    updateItem(item: any): Promise<any>;
    createItem(item: any): Promise<any>;
}