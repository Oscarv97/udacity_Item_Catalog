import { IDataBaseService } from "./IDataBaseService";
import { IInventoryItem } from "./IInventoryItem";
export class DataBaseService implements IDataBaseService {

    /**
     * Retrieve all items from sqlite db though Flask api
     *
     * @returns {Promise<IInventoryItem[]>}
     * @memberof DataBaseService
     */
    public getAll(): Promise<IInventoryItem[]> {
        return fetch('/items/api/v1.0/all/',
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

    /**
     *  Not Implemented
     *  
     * @param {string} itemId
     * @param {string} catagoryId
     * @returns {Promise<any>}
     * @memberof DataBaseService
     */
    public getItem(itemId: string, catagoryId: string): Promise<any> {
        return fetch('/items/api/v1.0/catalog/',  {
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

    /**
     * Post to flask api with Id of item to delete 
     *
     * @param {number} itemId
     * @returns {Promise<any>}
     * @memberof DataBaseService
     */
    public deleteItem(itemId: number): Promise<any> {
        return fetch(`/items/api/v1.0/games/${itemId}/delete/`, {
            method: "POST",
            mode: "no-cors",
           
        }).then((response: any) => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
            return(response);
        }).catch((error: Error) => {
            this.handleError(error)
        });
    }

    /**
     * Update fields of given item
     *
     * @param {IInventoryItem} item
     * @returns {Promise<any>}
     * @memberof DataBaseService
     */
    public updateItem(item: IInventoryItem): Promise<any> {
        return fetch(`items/api/v1.0/games/${item.id}/update/`, {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
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


    /**
     * Create new item in DB
     *  @Post
     * @param {IInventoryItem} item
     * @returns {Promise<any>}
     * @memberof DataBaseService
     */
    public createItem(item: IInventoryItem): Promise<any> {
        console.log(JSON.stringify(item));
        return fetch('/items/api/v1.0/games/new/', {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then((response: Response) => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
            return(response);
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