export interface IDataBaseService { 
    getAll(): Promise<any>;
    getItem(itemId: string, catagoryId: string): Promise<any>;
    deleteItem(itemId: string): Promise<any>;
    updateItem(item: any): Promise<any>;
    createItem(item: any): Promise<any>;
}