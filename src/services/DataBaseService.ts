import { IDataBaseService } from "./IDataBaseService";
import { IInventoryItem } from "./IInventoryItem";
import { isPromiseAlike } from "q";
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
     * Request arbitrary item from Database by
     *
     * @param {number} itemId
     * @param {string} categoryName
     * @returns {Promise<any>}
     * @memberof DataBaseService
     */
    public getItem(itemId: number, categoryName: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
           fetch(`/items/api/v1.0/getgame/${categoryName}/${itemId}/`,  {
                headers :{
                    method: "GET",
                    mode: "no-cors",
                },
            }).then((response: Response) => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                resolve(response.json());
            }).catch((error: Error) => {
                this.handleError(error)
            });
        })
    }

    /**
     * Request arbitrary item from Database by
     *
     * @param {number} itemId
     * @param {string} categoryName
     * @returns {Promise<any>}
     * @memberof DataBaseService
     */
    public getCategoryItems( categoryName: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
           fetch(`/items/api/v1.0/categoryItems/${categoryName}/`,  {
                headers :{
                    method: "GET",
                    mode: "no-cors",
                },
            }).then((response: Response) => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                resolve(response.json());
            }).catch((error: Error) => {
                this.handleError(error)
            });
        })
    }


    /**
     * Post to flask api with Id of item to delete 
     *
     * @param {number} itemId
     * @param {string} token
     * @returns {Promise<any>}
     * @memberof DataBaseService
     */
    public deleteItem(itemId: number, token: string, user_id: string): Promise<any> {
        return fetch(`/items/api/v1.0/games/${itemId}/delete/${user_id}/`, {
            method: "POST",
            credentials: "include",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +token
            }
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
    public updateItem(item: IInventoryItem, token: string): Promise<any> {
        return fetch(`items/api/v1.0/games/${item.id}/update/`, {
            method: "POST",
            credentials: "include",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +token
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


    /**
     * Create new item in DB
     *  @Post
     * @param {IInventoryItem} item
     * @returns {Promise<any>}
     * @memberof DataBaseService
     */
    public createItem(item: IInventoryItem, token: string): Promise<any> {
        console.log(JSON.stringify(item));
        return fetch('/items/api/v1.0/games/new/', {
            method: "POST",
            credentials: "include",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +token
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
        console.log(error);
    }

}