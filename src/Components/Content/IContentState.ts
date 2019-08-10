import { IIventoryItem } from "~services/IInventoryItem";

export interface IContentState {
    items: IIventoryItem[];
    selection: IIventoryItem;
    canSelect: boolean;
    isEdit: boolean;
    canSave: boolean;
    edtingItem: IIventoryItem;
}