import { IDataBaseService } from "./IDataBaseService";
import { fetch } from "whatwg-fetch";

export class DataBaseService implements IDataBaseService {
    public getAll(): Promise<any> {
        return fetch('/api/', {
            method: "GET"
        });
    } 
    
    public getItem(itemId: string, catagoryId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
    public deleteItem(itemId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
    public updateItem(item: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
    public createItem(item: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}