import { IInventoryItem } from "./IInventoryItem";

export interface IDataBaseService { 
    getAll(): Promise<IInventoryItem[]>;
    getItem(itemId: number, categoryName: string): Promise<any>;
    deleteItem(itemId: number, userToken: string): Promise<any>;
    updateItem(item: IInventoryItem, userToken: string): Promise<any>;
    createItem(item: IInventoryItem, userToken: string): Promise<any>;
}