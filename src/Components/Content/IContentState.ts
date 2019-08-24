import { IInventoryItem } from "~services/IInventoryItem";

export interface IContentState {
    items: IInventoryItem[];
    selection: IInventoryItem;
    canSelect: boolean;
    currentUser: firebase.User;
    errMsg: string;
    isEdit: boolean;
    canSave: boolean;
    edtingItem: IInventoryItem;
}