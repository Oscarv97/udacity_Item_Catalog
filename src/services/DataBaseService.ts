import { IDataBaseService } from "./IDataBaseService";
import { IInventoryItem } from "./IInventoryItem";
// import {fetch }from "whatwg-fetch";
export class DataBaseService implements IDataBaseService {

    public getAll(): Promise<IInventoryItem[]> {

        return fetch('api/all/',
        {
            method: "GET",
            mode: "no-cors"
        }).then((response: Response) => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
            return response.json();
        }).catch((error: Error) => {
            this.handleError(error)
        });
    }

    public getItem(itemId: string, catagoryId: string): Promise<any> {
        return fetch('/api/catalog/',  {
            method: "GET",
        
        }).then((response: Response) => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
            return response.json();
        }).catch((error: Error) => {
            this.handleError(error)
        });
    }

    public deleteItem(itemId: number): Promise<any> {
        return fetch('http://localhost:5000/api/delete', {
            method: "POST",
            mode: "cors"
        }).then((result: any) => {

        }).catch((error: Error) => {
            this.handleError(error)
        });
    }

    public updateItem(item: any): Promise<any> {
        return fetch('/api/', {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        }).then((response: Response) => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
        }).catch((error: Error) => {
            this.handleError(error)
        });
    }

    public createItem(item: any): Promise<any> {
        console.log(JSON.stringify(item));
        return fetch('api/games/new', {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        }).then((response: Response) => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
        }).catch((error: Error) => {
            this.handleError(error)
        });
    }


    private handleResponseError(response: Response) {
        throw new Error("HTTP error, status = " + response.status);
    }

    private handleError(error: Error) {
        console.log(error.message);
    }

}