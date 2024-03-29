import { IInventoryItem } from "./IInventoryItem";

export interface IDataBaseService { 
    getAll(): Promise<IInventoryItem[]>;
    getItem(itemId: number, categoryName: string): Promise<any>;
    getCategoryItems(categoryName: string): Promise<any>;
    deleteItem(itemId: number, userToken: string, user_id: string): Promise<any>;
    updateItem(item: IInventoryItem, userToken: string): Promise<any>;
    createItem(item: IInventoryItem, userToken: string): Promise<any>;
}