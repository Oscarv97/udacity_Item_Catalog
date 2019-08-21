import { IInventoryItem } from "~services/IInventoryItem";

export interface IContentState {
    items: IInventoryItem[];
    selection: IInventoryItem;
    canSelect: boolean;
    isEdit: boolean;
    canSave: boolean;
    edtingItem: IInventoryItem;
}