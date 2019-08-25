import { IInventoryItem } from "~services/IInventoryItem";

export interface IHomeState {
    dbResults: IInventoryItem[];
    authUser: firebase.User;
    formOpen: boolean;
    formItem: IInventoryItem;
}